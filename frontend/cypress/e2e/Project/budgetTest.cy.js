/* eslint-disable no-undef */
describe("Add Budget", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
  });

  it("successfully adds a budget entry", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="budget"]').type("500");
    cy.get('input[name="startDate"]').type("2025-05-01");
    cy.get('input[name="endDate"]').type("2025-05-31");
    cy.get('button[type="submit"]').click();
    cy.contains("Budget added/updated successfully.").should("be.visible");
  });

  it("shows an error when adding a budget without any amount", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="budget"]').type("-500");
    cy.get('input[name="startDate"]').type("2025-05-01");
    cy.get('input[name="endDate"]').type("2025-05-31");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to add/update budget.").should("be.visible");
  });

  it("shows an error when adding a budget with a negative amount", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="startDate"]').type("2025-05-01");
    cy.get('input[name="endDate"]').type("2025-05-31");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to add/update budget.").should("be.visible");
  });

  it("Shows an error when the end date is less than start", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="budget"]').type("500");
    cy.get('input[name="startDate"]').type("2025-05-31");
    cy.get('input[name="endDate"]').type("2025-05-01");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to add/update budget.").should("be.visible");
  });
});
