/* eslint-disable no-undef */
describe("Signup Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/auth/signup");
  });

  it("successfully signs up with valid credentials", () => {
    cy.get('input[name="username"]').type("newuser123334");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe123@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get("#currency").click();
    cy.contains("div", "USD").click();
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/user/home");
  });

  it("show us error when signing up with existing user name", () => {
    cy.get('input[name="username"]').type("newuser123334");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe1234@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get("#currency").click();
    cy.contains("div", "USD").click();
    cy.get('button[type="submit"]').click();
    cy.contains(
      "An error occurred while creating your account. Please try again."
    ).should("be.visible");
    cy.url().should("not.include", "/user/home");
  });

  it("show us error when signing up with existing email", () => {
    cy.get('input[name="username"]').type("newuser123334234");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe123@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get("#currency").click();
    cy.contains("div", "USD").click();
    cy.get('button[type="submit"]').click();
    cy.contains(
      "An error occurred while creating your account. Please try again."
    ).should("be.visible");
    cy.url().should("not.include", "/user/home");
  });

  it("shows an error when passwords do not match", () => {
    cy.get('input[name="username"]').type("TestUser1234");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe1234@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123sdfdsf");
    cy.get("#currency").click();
    cy.contains("div", "USD").click();
    cy.get('button[type="submit"]').click();
    cy.contains(
      "An error occurred while creating your account. Please try again."
    ).should("be.visible");
    cy.url().should("not.include", "/user/home");
  });
});
