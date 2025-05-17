/* eslint-disable no-undef */

describe("Transactions and Report View Page", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
  });

  it("Displays the Heading, Filters and Transactions", () => {
    cy.contains("Finance Tracker").should("be.visible");
    cy.contains("Filters").should("be.visible");
    cy.contains("Filter by Tags").should("be.visible");
    cy.contains("Transactions").should("be.visible");
    cy.contains("Edit").should("be.visible");
    cy.contains("Delete").should("be.visible");
    cy.contains("Report").should("be.visible");
    cy.contains("Edit").should(
      "have.css",
      "background-color",
      "rgb(59, 130, 246)"
    );
    cy.contains("Delete").should(
      "have.css",
      "background-color",
      "rgb(239, 68, 68)"
    );
    cy.contains("Report").should(
      "have.css",
      "background-color",
      "rgb(168, 85, 247)"
    );
  });

  it("Clicks the Report button and verifies report page content", () => {
    cy.contains("Report").click();
    cy.url().should("eq", "http://localhost:5173/user/report");
    cy.wait(4000);
    cy.contains("Generate Report (PDF)").should("be.visible");
    cy.contains("User Report").should("be.visible");
    cy.contains("Filter Report").should("be.visible");
    cy.contains("Total Income").should("be.visible");
    cy.contains("Total Expense").should("be.visible");
    cy.contains("Grand Total").should("be.visible");
    cy.contains("Income & Expense Breakdown").should("be.visible");
    cy.contains("Highest & Lowest Transactions").should("be.visible");
    cy.contains("User Budget Overview").should("be.visible");
  });
});

describe("Edit First Transaction", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
  });

  it("Edits a transcation with valid details", () => {
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
    cy.get("#edit-date").clear().type("2025-05-25");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Transaction updated successfully!").should("be.visible");
  });

  it("Shows an error when submitting form with empty title", () => {
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
    cy.get("#edit-date").clear().type("2025-05-25");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Title is required").should("be.visible");
  });

  it("Shows an error when submitting form with negative amount", () => {
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
    cy.get("#edit-date").clear().type("2025-05-25");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Amount must be a valid positive number").should("be.visible");
  });

  it("Shows an error when submitting form with a past date", () => {
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
    cy.get("#edit-date").clear().type("2020-05-15");
    cy.get("#edit-isRecurring").check();
    cy.get("#edit-recurrenceType").select("Yearly");
    cy.get("#edit-save-btn").click();
    cy.contains("Date must be greater than or equal to today").should(
      "be.visible"
    );
  });
});

describe("Deleting Transactions Logics", () => {
  beforeEach(() => {
    cy.login("userTest2", "userTest2");
    cy.visit("http://localhost:5173/user/view-transaction");
    cy.wait(1000);
  });

  it("Displays Error Message when Deleting Recurring Income", () => {
    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("td").then(($cells) => {
          const type = $cells.eq(1).text().trim();
          const recurring = $cells.eq(4).text().trim();

          if (type === "Income" && recurring === "Yearly") {
            cy.contains("Delete").click();
          }
        });
      });
    });

    cy.contains(
      "Cannot delete a recurring income. Please disable recurrence first"
    ).should("be.visible");
  });

  it("Deletes Transaction Successfully", () => {
    let deletedTitle;

    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("td")
          .eq(4)
          .then(($recurringCell) => {
            if ($recurringCell.text().trim() === "No" && !deletedTitle) {
              cy.get("td")
                .eq(0)
                .invoke("text")
                .then((titleText) => {
                  deletedTitle = titleText.trim();
                });

              cy.contains("Delete").click();

              return false;
            }
          });
      });
    });
    cy.contains("Transaction deleted successfully!", { timeout: 4000 }).should(
      "be.visible"
    );
  });
});
