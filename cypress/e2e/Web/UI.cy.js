/// <reference types ="cypress" />

/*Regras de negócio: 
•	1 - Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho;
•	2 - Os valores não podem ultrapassar a R$ 990,00;
•	3 - Valores entre R$ 200 e R$ 600 , ganham cupom de 10% 
•	4 - Valores acima de R$ 600 ganham cupom de 15%

Na automação deve adicionar pelo menos 3 produtos diferentes e 
validar se os itens foram adicionados com sucesso.
*/

describe('Funcionalidade: Add produtos no Carrinho', () => {

  before(() => {
    cy.visit('minha-conta/')
    cy.cLogin()
  });

  // 1 - Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho;
  it.skip('1 - Add + de 10 produtos e quebra o teste', () => {
    cy.visit('product-category/clothing/')
    cy.add11Prod()
  });

  // 2 - Os valores não podem ultrapassar a R$ 990,00;
  it.skip('2 - Add produtos com valor total maior que 990 e quebrar o teste', () => {
    cy.visit('product-category/clothing/')
    cy.add3Prod()
    cy.validarItensCarrinho()
    cy.validarVlTotal()
  });

  // 3 - Valores entre R$ 200 e R$ 600 , ganham cupom de 10% 
  it.skip('3 - Add produtos com valor entre 200 e 600 aplicando cupom de 10%', () => {
    cy.visit('product-category/clothing/')
    cy.addProdCupom10()

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click() // entra no carrinho
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
    
    cy.AplicarCupom10()
  });

  // 4 - Valores acima de R$ 600 ganham cupom de 15%
  it('4 - Add produtos com valor acima de 600 aplicando cupom de 15%', () => {
    cy.visit('product-category/clothing/')
    cy.addProdCupom15()
    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click() // entra no carrinho
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
    cy.AplicarCupom15()
  });

  it.skip('Add produtos fora de estoque', () => {
    cy.visit('product-category/clothing/')
    cy.addProdForaEstoque()
  });
});