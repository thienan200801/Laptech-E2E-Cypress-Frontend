describe('Registration page navigation', () => { 
    it('Verify UI of Registration page', () => {
        cy.visit("http://localhost:3000/");
        cy.get('div').contains('Account').click();
        cy.get('p').contains('Sign up').click();
        cy.get('#registerTitle').should('be.visible');
    })   
});
describe('Registration page UI and functionality', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/register");
    });
    it('Verify FE validation for email and password', () => {
        cy.get('#registerUserName').clear().type('Andie');
        cy.get('#registerEmail').clear().type('Andie@gmail.com');
        cy.get('#registerPassword').clear().type('a123456@@');
        cy.get('#registerConfirmPassword').clear().type('a123456@@');
        cy.get('#registerBtn').click();
        cy.on("window:confirm", () => true);
    });
})