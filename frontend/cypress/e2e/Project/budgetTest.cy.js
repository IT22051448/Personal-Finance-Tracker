/* eslint-disable no-undef */
describe("Add Budget", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
  });

  it("shows error when all fields are empty", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to add/update budget.").should("be.visible");
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

  it("successfully adds a decimal budget amount", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="budget"]').type("123.45");
    cy.get('input[name="startDate"]').type("2025-06-01");
    cy.get('input[name="endDate"]').type("2025-06-30");
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

  it("shows error when budget amount is zero", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Rent").click();
    cy.get('input[name="budget"]').type("0");
    cy.get('input[name="startDate"]').type("2025-06-01");
    cy.get('input[name="endDate"]').type("2025-06-30");
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

  it("shows an error when start and end date are the same", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Transport").click();
    cy.get('input[name="budget"]').type("300");
    cy.get('input[name="startDate"]').type("2025-05-15");
    cy.get('input[name="endDate"]').type("2025-05-15");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to add/update budget.").should("be.visible");
  });

  it("displays newly added budget in the list after refresh", () => {
    cy.visit("http://localhost:5173/user/budgets");

    cy.get("#category").click();
    cy.contains("div", "Groceries").click();
    cy.get('input[name="budget"]').type("200");
    cy.get('input[name="startDate"]').type("2025-06-01");
    cy.get('input[name="endDate"]').type("2025-06-30");
    cy.get('button[type="submit"]').click();
    cy.contains("Budget added/updated successfully.").should("be.visible");

    cy.reload();
    cy.contains("Groceries").should("exist");
    cy.contains("200").should("exist");
  });

  it("resets form after successful budget entry", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Entertainment").click();
    cy.get('input[name="budget"]').type("150");
    cy.get('input[name="startDate"]').type("2025-07-01");
    cy.get('input[name="endDate"]').type("2025-07-31");
    cy.get('button[type="submit"]').click();
    cy.contains("Budget added/updated successfully.").should("be.visible");

    cy.get('input[name="budget"]').should("have.value", "");
  });

  it("successfully deletes a budget entry", () => {
    cy.visit("http://localhost:5173/user/budgets");
    cy.get("#category").click();
    cy.contains("div", "Shopping").click();
    cy.get('input[name="budget"]').type("100");
    cy.get('input[name="startDate"]').type("2025-06-01");
    cy.get('input[name="endDate"]').type("2025-06-30");
    cy.get('button[type="submit"]').click();

    cy.contains("Budget added/updated successfully.").should("be.visible");
    cy.reload();

    cy.contains(".p-6", "Shopping")
      .should("exist")
      .within(() => {
        cy.contains("Delete").click();
      });

    cy.reload();
    cy.contains("Shopping").should("not.exist");
    cy.contains("100").should("not.exist");
  });
});
