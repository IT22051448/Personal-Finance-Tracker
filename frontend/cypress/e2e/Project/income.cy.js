/* eslint-disable no-undef */
describe("Income creation test", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
    cy.visit("http://localhost:5173/user/incomes");
  });

  it("Successful adds an income", () => {
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
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="date"]').type("2025-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Missing required fields").should("exist");
  });

  it("shows an error when entering a past date", () => {
    cy.get('input[name="title"]').type("testIncome");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="amount"]').type("4000");
    cy.get('input[name="date"]').type("2019-10-20");
    cy.get('textarea[name="description"]').type("userTest2");
    cy.get('button[type="submit"]').click();
    cy.contains("Date must be greater than or equal to today").should("exist");
  });

  it("validates required fields with red asterisks", () => {
    cy.get('label:contains("Title")').should('contain', '*');
    cy.get('label:contains("Category")').should('contain', '*');
    cy.get('label:contains("Currency")').should('contain', '*');
    cy.get('label:contains("Amount")').should('contain', '*');
    cy.get('label:contains("Date")').should('contain', '*');

  });

  it("allows adding and removing tags", () => {
    const testTag = "test-tag";
    cy.get('input[placeholder="Type a tag and press Enter"]')
      .type(testTag)
      .type('{enter}');
    cy.contains('.bg-gray-200', `#${testTag}`).should('exist');
    cy.contains('.bg-gray-200', `#${testTag}`)
      .find('button.text-red-500')
      .click();
    cy.contains('.bg-gray-200', `#${testTag}`).should('not.exist');
  });

  it("prevents duplicate tags", () => {
    const testTag = "unique-tag";
    cy.get('input[placeholder="Type a tag and press Enter"]')
      .type(testTag)
      .type('{enter}')
      .type(testTag)
      .type('{enter}');
    cy.get('.bg-gray-200').contains(`#${testTag}`).should('have.length', 1);
  });

  it("displays recent incomes correctly", () => {
    cy.contains('h2', 'Recent Incomes').should('exist');
    cy.get('.bg-gray-50').should('exist');
    cy.get('.bg-gray-50').first().within(() => {
      cy.get('p.text-lg').should('exist');
      cy.get('p.text-green-600').should('exist');
      cy.get('p.text-blue-700').should('exist');
      cy.get('button.bg-red-500').should('exist');
    });
  });

  it("allows deleting an income", () => {
    cy.get('input[name="title"]').type("Test Income to Delete");
    cy.get("#category").click();
    cy.contains("div", "Salary").click();
    cy.get('input[name="amount"]').type("100");
    cy.get('input[name="date"]').type("2025-12-31");
    cy.get('button[type="submit"]').click();
    cy.contains("Income added successfully!").should("exist");
    cy.get('.bg-gray-50').first().within(() => {
      cy.get('button.bg-red-500').click();
    });
    cy.contains("Income deleted successfully!").should("exist");
  });

  it("displays correctly on mobile devices", () => {
    cy.viewport('iphone-6');
    cy.get('.flex-wrap').should('have.css', 'flex-direction', 'row');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});
