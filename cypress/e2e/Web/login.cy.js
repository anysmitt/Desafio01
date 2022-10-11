/// <reference types ="cypress" />

describe('Funcionalidade: Registrar novo usuário e fazer Login', () => {

    before(() => {
        cy.visit('minha-conta/')
    });

    it.only('Registrar novo usuário', () => {
        cy.cRegister()

        // logar caso o usuário já exista
        cy.contains('Erro: Uma conta já está registrada com seu endereço de e-mail. Faça login.')
        {
            cy.cLogin() // logar caso o usuário ja esteja cadastrado
        }
    });


});