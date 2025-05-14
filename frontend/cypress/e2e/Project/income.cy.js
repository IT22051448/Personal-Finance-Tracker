/* eslint-disable no-undef */
describe("Income creation test", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
  });

  it("Successful adds an income", () => {
    cy.visit("http://localhost:5173/user/incomes");
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="amount"]').type("123");
    cy.get('input[name="date"]').type("2025-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Income added successfully!").should("exist");
  });

  it("shows an error when entering a negative income", () => {
    cy.visit("http://localhost:5173/user/incomes");
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="amount"]').type("-123");
    cy.get('input[name="date"]').type("2025-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Amount must be a Positive Number").should("exist");
  });

  it("shows an error when submitting the form without an amount", () => {
    cy.visit("http://localhost:5173/user/incomes");
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="date"]').type("2025-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Missing required fields").should("exist");
  });

  it("shows an error when entering a past date", () => {
    cy.visit("http://localhost:5173/user/incomes");
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="amount"]').type("4000");
    cy.get('input[name="date"]').type("2019-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Date must be greater than or equal to today").should("exist");
  });
});
