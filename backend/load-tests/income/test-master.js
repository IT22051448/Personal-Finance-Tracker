import addIncomeTest from "./add-income-test.js";
import getIncomeTest from "./get-income-test.js";
// Add more imports...

export const options = {
  scenarios: {
    add_income: {
      executor: "constant-vus",
      exec: "addIncomeTest",
      vus: 5,
      duration: "30s",
    },
    get_incomes: {
      executor: "constant-vus",
      exec: "getIncomeTest",
      vus: 5,
      duration: "30s",
    },
    // Add more scenarios
  },
};

export { addIncomeTest, getIncomeTest };
