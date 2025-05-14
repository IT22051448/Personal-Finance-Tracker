/* eslint-disable no-undef */
describe("Edit First Transaction", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
  });

  it("Edits a transcation with valid details", () => {
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.contains("Edit").click();
      });
    cy.get("#edit-title").should("be.visible");
    cy.get("#edit-title").clear().type("Updated Grocery Shopping");
    cy.get("#edit-type").should("have.attr", "readonly");
    cy.get("#category").click();
    cy.contains("div", "Gift").click({ force: true });
    cy.get("#edit-amount").clear().type("150.75");
    cy.get("#edit-currency").clear().type("USD");
    cy.get("#edit-tags").clear().type("food, weekly");
    cy.get("#edit-description")
      .clear()
      .type("Weekly grocery run at the local market.");
    cy.get("#edit-date").clear().type("2025-05-03");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Transaction updated successfully!").should("be.visible");
  });

  it("Shows an error when submitting form with empty title", () => {
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.contains("Edit").click();
      });
    cy.get("#edit-title").should("be.visible");
    cy.get("#edit-title").clear();
    cy.get("#edit-type").should("have.attr", "readonly");
    cy.get("#category").click();
    cy.contains("div", "Gift").click({ force: true });
    cy.get("#edit-amount").clear().type("150.75");
    cy.get("#edit-currency").clear().type("USD");
    cy.get("#edit-tags").clear().type("food, weekly");
    cy.get("#edit-description")
      .clear()
      .type("Weekly grocery run at the local market.");
    cy.get("#edit-date").clear().type("2025-05-03");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Title is required").should("be.visible");
  });

  it("Shows an error when submitting form with negative amount", () => {
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.contains("Edit").click();
      });
    cy.get("#edit-title").clear().type("Updated Grocery Shopping");
    cy.get("#edit-type").should("have.attr", "readonly");
    cy.get("#category").click();
    cy.contains("div", "Gift").click({ force: true });
    cy.get("#edit-amount").clear().type("-100");
    cy.get("#edit-currency").clear().type("USD");
    cy.get("#edit-tags").clear().type("food, weekly");
    cy.get("#edit-description")
      .clear()
      .type("Weekly grocery run at the local market.");
    cy.get("#edit-date").clear().type("2025-05-03");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Amount must be a valid positive number").should("be.visible");
  });

  it("Shows an error when submitting form with a past date", () => {
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.contains("Edit").click();
      });
    cy.get("#edit-title").clear().type("Updated Grocery Shopping");
    cy.get("#edit-type").should("have.attr", "readonly");
    cy.get("#category").click();
    cy.contains("div", "Gift").click({ force: true });
    cy.get("#edit-amount").clear().type("100");
    cy.get("#edit-currency").clear().type("USD");
    cy.get("#edit-tags").clear().type("food, weekly");
    cy.get("#edit-description")
      .clear()
      .type("Weekly grocery run at the local market.");
    cy.get("#edit-date").clear().type("2020-05-03");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Date must be greater than or equal to today").should(
      "be.visible"
    );
  });
});
