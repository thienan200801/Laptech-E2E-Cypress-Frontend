describe('Login page', () => { 
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get('div').contains('Account').click();
        cy.get('#loginMgt').click();
    })
    it('As a user, I want to validate email and password input on frontend side', () => {
        cy.log('Verify email input validation');
        cy.get('[type="email"]').clear().type("ahdsj79283");
        cy.get('button').contains('Login').click();

        cy.log('Verify password input validation');
        cy.log('Verify password failed since password only contains special characters')
        cy.get('[type="email"]').clear().type("ahdsj79283");
        cy.get('[type="password"]').clear().type("!@#$%^&*");
        cy.get('button').contains('Login').click();
        
        cy.log('Verify password failed since password only contains number');
        cy.get('[type="password"]').clear().type("012345789");
        cy.get('button').contains('Login').click();
    });
    it('Verify login failed with unregisted account', () => {
        cy.get('[type="email"]').type("an@gmail.com");
        cy.get('[type="password"]').type("asd123456789@");
        cy.get('button').contains('Login').click();
    })
    it('Verify login successfully with valid account information', () => {
        cy.get('[type="email"]').type("test@gmail.com");
        cy.get('[type="password"]').type("123");
        cy.get('button').contains('Login').click();
    })
})