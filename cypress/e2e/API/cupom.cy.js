/// <reference types ="cypress" />

describe('Funcionalidade: APi de Cupons', () => {

    it.skip('cupom de 10%', () => {
        cy.request({
            url: 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons',
            method: 'POST',
            failOnStatusCode: false, // garante que vai seguir o teste se retornar acima de 200 
            body: { // le json
                "code": "gracupom10",
                "amount": "10",
                "discount_type": "fixed_product",
                "description": "Cupom de Dez"
            },
            headers: {
                // Usuário: 'admin_ebac',
                //  Senha: '@admin!&b@c!2022',
                Authorization: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
            }
        }).then(response => { // resposta do serviço
            cy.log(response)
            const {
                status, body, duration
            } = response
            expect(status).to.be.equal(201)
            expect(body).to.be.haveOwnProperty('id')
            expect(body).to.be.haveOwnProperty('code', 'gracupom10')
            expect(duration).to.be.lt(5000)
        })
    })

    it('cupom de 15%', () => {
        cy.request({
            url: 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons',
            method: 'POST',
            failOnStatusCode: false, // garante que vai seguir o teste se retornar acima de 200 
            body: { // le json
                "code": "gracupom15",
                "amount": "15",
                "discount_type": "fixed_product",
                "description": "Cupom de Dez"
            },
            headers: {
                Authorization: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
            }
        }).then(response => { // resposta do serviço
            cy.log(response)
            const {
                status, body, duration
            } = response
            expect(status).to.be.equal(201)
            expect(body).to.be.haveOwnProperty('id')
            expect(body).to.be.haveOwnProperty('code', 'gracupom15')
            expect(duration).to.be.lt(5000)
        })
    })

    it.only('Listar cupom de 10%', () => {
        cy.request({
            url: 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons',
            method: 'GET',
            failOnStatusCode: false, // garante que vai seguir o teste se retornar acima de 200 
            headers: {
                Authorization: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
            }
        }).should(response => { // resposta do serviço
            const {
                status, body
            } = response
            expect(status).to.be.equal(200)
            expect(body).to.be.not.empty // garante que não ta vazio
            for(const cupom of body) { // percorreu todo conteudo da variavel body, pq o body é um array
                cy.log(JSON.stringify(cupom))
                expect(cupom).to.be.haveOwnProperty('code')
                expect(cupom).to.be.haveOwnProperty('amount')
            }
            const hascupom = body.find(item => item.code==='gracupom15')
            expect(hascupom).to.be.not.undefined
        })
    })
});