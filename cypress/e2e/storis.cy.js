const { table } = require("console");

describe("add product to the cart", () => {
  it("product SKU has correct name, price and shipping cost", () => {
    cy.visit("https://qa10-7-0-19.azurewebsites.net/can100");

    cy.get(".close-popup").click();

    cy.get(".sku").should("contain", "CAN100");

    cy.get(".product-price").should("contain", "119.99");
    cy.get(
      '[class = "button-1 add-to-cart-button nopAjaxCartProductVariantAddToCartButton"]'
    ).click();
    cy.get('[class = "button-1 productAddedToCartWindowCheckout"]').click();
    cy.get("tbody tr")
      // .contains("tr", "CAN100")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".product").should("contain", "CAN100");
      });

    cy.get("tbody")
      .contains("tr", "Total")
      .then((totalTableRow) => {
        cy.wrap(totalTableRow).find("td").eq(1).should("contain", "119.99");
      });
    cy.get("tbody")
      .contains("tr", "Shipping")
      .then((shippingTableRow) => {
        cy.wrap(shippingTableRow)
          .find("td")
          .eq(1)
          .should("contain", "Calculated during checkout");
      });
  });
});
