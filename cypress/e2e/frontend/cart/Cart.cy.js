describe("Cart page", () => {
  it("As a user, I want to navigate to Cart when clicking on My cart button", () => {
    cy.visit("http://localhost:3000");
    cy.get("div")
      .contains("My cart", { matchCase: false })
      .click({ force: true });
  });
  it("As a user, I want to add items to cart", () => {
    cy.visit("http://localhost:3000/productdetail/661bd5f05460b356c0d0b90d");
    cy.get("#buyNowBtn").click();

    cy.log("Login");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("123");
    cy.get("button").contains("Login").click();
    cy.on("window:confirm", () => true);

    cy.log("Add one item to cart");
    cy.get("#buyNowBtn").click();

    cy.log("Route to cart");
    cy.get("div")
      .contains("My cart", { matchCase: false })
      .click({ force: true });
    cy.wait(3000);
    cy.get("#checkoutItem").children().should("have.length", 1);

    cy.log("Verify searching functionality");
    cy.get('[placeholder="Find your product..."]')
      .type("Lenovo");
    cy.wait(5000);
    cy.get('#searchItemInfo').last().click();

    cy.log('Add 2 more items');
    cy.get('#increaseBtn').click();
    cy.get('#increaseBtn').click();
    cy.get('#buyNowBtn').click();
    cy.get("div")
      .contains("My cart", { matchCase: false })
      .click({ force: true });
    //Assertion TBD
  });
  it('As a user, I want to verify personal information during checkout process', () => {
    cy.visit('http://localhost:3000/cart');
    const cartInfoRequiredComponent = ['cartInfoContainer', 'cartAddress', 'cartPhoneNumber', 'priceDetails', 'subTotal', 'discount', 'shippingFee', 'total', 'payAmount']
    cartInfoRequiredComponent.forEach(comp => {
      cy.get('#'+comp).should('be.visible');
    })
    cy.get('#cartItemInfoContainer > p').should('have.length', 5);
  })
});
