const menu = ["Laptop", "Laptop Gaming", "PC Gaming", "PC làm việc"];

beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.wait(10000);
});

describe("As a QC, I want to verify Homepage", () => {
  it("Verify the whole UI of home page", () => {
    cy.get("#laptechLogo").should("have.attr", "src");
    //cy.get('.Search_search__OF-2W > input').should('be.visible');
    cy.get("div").contains("Account");
    cy.get("div").contains("My cart", { matchCase: false });
    cy.get("p").contains("Danh mục").should("be.visible");
    cy.get("#menuBar")
      .children()
      .then(($e) => {
        expect($e).to.have.length(8);
        cy.get($e[0]).should("have.attr", "href").and("include", "/laptop");
        cy.get($e[1])
          .should("have.attr", "href")
          .and("include", "/laptopgaming");
        cy.get($e[2]).should("have.attr", "href").and("include", "/pcgaming");
        cy.get($e[3]).should("have.attr", "href").and("include", "/pclamviec");
        cy.get($e[4]).should("have.attr", "href").and("include", "/linhkienpc");
        cy.get($e[5]).should("have.attr", "href").and("include", "/manhinh");
        cy.get($e[6])
          .should("have.attr", "href")
          .and("include", "/tainghevloa");
        cy.get($e[7]).should("have.attr", "href").and("include", "/phukien");
      });
    cy.get(".slick-slide").should("be.visible");
    cy.scrollTo(0, 500);
    // cy.get("#contentHotProduct")
    //   .children()
    //   .then(($e) => {
    //     expect($e).to.have.length(5);
    //     cy.get($e[0]).contains("Sản phẩm nổi bật");
    //     cy.get($e[1]).contains("PC bán chạy");
    //     cy.get($e[2]).contains("PC Gaming bán chạy");
    //     cy.get($e[3]).contains("Laptop văn phòng bán chạy");
    //     cy.get($e[4]).contains("Laptop Gaming bán chạy");
    // });
  });
  it("Verify the whole UI of catalog product and logo functionality", () => {
    menu.forEach((menuItem) => {
      cy.log("Verify UI of product catelog");
      cy.get("span").contains(menuItem).click();
      cy.wait(1000);
      cy.get("#laptopBrand").children().should("have.length.of.at.least", 1);

      cy.log("Verify user will be routed to Homepage when clicking on logo");
      cy.get("#laptechLogo").click();
      cy.get("div").contains("Account").should("be.visible");
    });
  });
});
describe("As a QC, I want to verify Product catalog page", () => {
  it("Verify functionality when clicking on each product item", () => {
    //cy.get("#cartItem").contains("alo").first().dblclick();
    //Dev fix-TBD
    // cy.get('#itemName').should('be.visible');
  });
});
