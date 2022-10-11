// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Register
Cypress.Commands.add("cRegister", () => {
    cy.contains('Register') // produto fora de estoque
    {
        cy.fixture("fLogin").then((user) => {
            cy.get('#reg_email').type(user.email)
            cy.get('#reg_password').type(user.senha) //senha
        })
        cy.get(':nth-child(4) > .button').click() // botão acessar
    }
});

// Logar
Cypress.Commands.add("cLogin", () => {
    cy.contains('Login') // produto fora de estoque
    {
        cy.fixture("fLogin").then((user) => {
            cy.get('#username').type(user.email)
            cy.get('#password').type(user.senha) //senha
        })
        cy.get('.woocommerce-form > .button').click() // botão acessar
    }
});

// Pedido
Cypress.Commands.add("addProdForaEstoque", () => {
    cy.contains('Abominable Hoodie') // produto fora de estoque
    {
        cy.get('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover').should('be.visible').click()
        cy.get('.button-variable-item-S').should('be.visible').click()
        cy.get('.button-variable-item-Red').should('be.visible').click()
        cy.contains('Fora de estoque')
        {
            cy.log('Produto fora de estoque, não pode ser adicionado ao carrinho')
            cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() //retorna pra opççao Clothing
        }
    }
});

// 1 - Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho;
Cypress.Commands.add("add11Prod", () => {
    cy.contains('Ajax Full-Zip Sweatshirt') // 1o produto disponivel
    {
        cy.get('.post-2622 > .product-block').should('be.visible').click()
        cy.get('.button-variable-item-XS').should('be.visible').click()
        cy.get('.button-variable-item-Red').should('be.visible').click()

        cy.contains('em estoque')
        {
            cy.get('.input-text').clear()
            cy.get('.input-text').type('11')
            cy.get('.input-text').invoke('val').then(parseInt).should('be.lte', 10)
        }
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // retorna pra lista de produtos
    }
});

// 2 - Os valores não podem ultrapassar a R$ 990,00;
Cypress.Commands.add("add3Prod", () => {

    cy.contains('Ajax Full-Zip Sweatshirt') // 1o produto disponivel
    {
        cy.get('.post-2622 > .product-block').should('be.visible').click()
        cy.get('.button-variable-item-XS').should('be.visible').click()
        cy.get('.button-variable-item-Red').should('be.visible').click()
        cy.get('.input-text').clear().type('13')
        cy.get('.single_add_to_cart_button').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // menu clothing
    }

    cy.get('.tbay-pagination').should('be.visible').get(':nth-child(2) > .page-numbers').click() // proxima pagina
    cy.contains('Atomic Endurance Running Tee (Crew-Neck)') // 2o produto disponivel
    {
        cy.get('.post-3345 > .product-block').should('be.visible').click() // produto
        cy.get('.button-variable-item-XL').should('be.visible').click() // tamanho
        cy.get('.button-variable-item-Black').click() // cor
        cy.get('.input-text').clear().type('11')
        cy.get('.single_add_to_cart_button').click() // add no carrinho
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // menu clothing
    }

    cy.contains('Arcadio Gym Short') // 2o produto disponivel
    {
        cy.get('.post-3528 > .product-block').should('be.visible').click() // produto
        cy.get('.button-variable-item-36').should('be.visible').click() // tamanho
        cy.get('.button-variable-item-Blue').click() // cor
        cy.get('.input-text').clear().type('5')
        cy.get('.single_add_to_cart_button').click() // add no carrinho
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // menu clothing
    }
});

Cypress.Commands.add("validarItensCarrinho", () => {

    cy.get('#cart > .dropdown-toggle').click() // click no icone do carrinho
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click() // click na opção carrinho da lista exibida

    cy.get('.page-title').should('be.visible') // verificando se entrou na tela do carrinho
    cy.contains('Carrinho')
    {
        // validando os produtos se tão no carrinho
        cy.contains('Ajax Full-Zip Sweatshirt')
        {
            cy.log('Ajax Full-Zip Sweatshirt está no carrinho OK')
        }
        cy.contains('Arcadio Gym Short')
        {
            cy.log('Arcadio Gym Short está no carrinho OK')
        };
        cy.contains('Atomic Endurance Running Tee (Crew-Neck)')
        {
            cy.log('Atomic Endurance Running Tee (Crew-Neck) está no carrinho OK')
        };
    }
});

Cypress.Commands.add("validarVlTotal", () => {

    cy.get('strong > .woocommerce-Price-amount').invoke('text').then((vlTot) => {
        cy.log(vlTot)
        var resultado = vlTot.replace('R$', '').replace('.', '').replace(',', '.')
        cy.log(resultado)
        const valor = parseFloat(resultado)
        expect(valor).to.be.lt(991)
    })
});

// 3 - Valores entre R$ 200 e R$ 600 , ganham cupom de 10% 
Cypress.Commands.add("addProdCupom10", () => {

    cy.contains('Ajax Full-Zip Sweatshirt') // 1o produto disponivel
    {
        cy.get('.post-2622 > .product-block').should('be.visible').click()
        cy.get('.button-variable-item-XS').should('be.visible').click()
        cy.get('.button-variable-item-Red').should('be.visible').click()
        cy.get('.input-text').clear().type('5')
        cy.get('.single_add_to_cart_button').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // menu clothing
    }
});

Cypress.Commands.add("AplicarCupom10", () => {

    cy.get('strong > .woocommerce-Price-amount').invoke('text').then((vlTot) => {
        cy.log(vlTot)
        var resultado = vlTot.replace('R$', '').replace('.', '').replace(',', '.')
        cy.log(resultado)
        const valor = parseFloat(resultado)
        expect(valor).to.be.lte(600)
        expect(valor).to.be.gte(200)
        cy.get('#coupon_code').clear().type('gracupom10').get('.coupon > .btn').click() // cupom de 10% aplicado
        cy.get('.woocommerce-message').should('be.visible').log('Cupom 10% Adicionado teste OK')
    })
});

// 4 - Valores acima de R$ 600 ganham cupom de 15%
Cypress.Commands.add("addProdCupom15", () => {

    cy.get('.tbay-pagination').should('be.visible').get(':nth-child(2) > .page-numbers').click() // proxima pagina
    cy.contains('Atomic Endurance Running Tee (Crew-Neck)') // 2o produto disponivel
    {
        cy.get('.post-3345 > .product-block').should('be.visible').click() // produto
        cy.get('.button-variable-item-XL').should('be.visible').click() // tamanho
        cy.get('.button-variable-item-Black').click() // cor
        cy.get('.input-text').clear().type('21')
        cy.get('.single_add_to_cart_button').click() // add no carrinho
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click() // menu clothing
    }
});

Cypress.Commands.add("AplicarCupom15", () => {

    cy.get('strong > .woocommerce-Price-amount').invoke('text').then((vlTot) => {
        cy.log(vlTot)
        var resultado = vlTot.replace('R$', '').replace('.', '').replace(',', '.')
        cy.log(resultado)
        const valor = parseFloat(resultado)
        expect(valor).to.be.gte(600)
        cy.get('#coupon_code').clear().type('gracupom15').get('.coupon > .btn').click() // cupom de 10% aplicado
        cy.get('.woocommerce-message').should('be.visible').log('Cupom 15% Adicionado teste OK')
    })
});
