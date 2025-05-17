import React from "react";
import {
  FiPieChart,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiSettings,
  FiBell,
} from "react-icons/fi";

const UserHome = () => {
  // Sample data - replace with real data from your backend
  const financialOverview = {
    balance: 5842.5,
    income: 3250.0,
    expenses: 1867.5,
    savingsGoal: 10000.0,
    progress: 58.4,
  };

  const recentTransactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -85.3,
      date: "Today",
      category: "Food",
    },
    {
      id: 2,
      name: "Paycheck",
      amount: 2500.0,
      date: "May 15",
      category: "Income",
    },
    {
      id: 3,
      name: "Electric Bill",
      amount: -120.75,
      date: "May 14",
      category: "Utilities",
    },
    {
      id: 4,
      name: "Coffee Shop",
      amount: -6.5,
      date: "May 14",
      category: "Food",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-gray-50">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-100 via-red-200 to-yellow-200 bg-[length:200%_200%] animate-background-motion z-0 opacity-30" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:text-indigo-600 transition-colors">
              <FiBell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              AJ
            </div>
          </div>
        </header>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Current Balance</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">
                ${financialOverview.balance.toLocaleString()}
              </h2>
              <p className="text-green-500 text-sm mt-2 flex items-center">
                <FiTrendingUp className="mr-1" /> 2.5% from last month
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FiDollarSign size={24} className="text-indigo-600" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Savings Goal</span>
              <span>{financialOverview.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${financialOverview.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-1">
              ${financialOverview.savingsGoal.toLocaleString()} target
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FiTrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Income</p>
                <p className="font-semibold text-gray-800">
                  ${financialOverview.income.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <FiTrendingUp
                  size={20}
                  className="text-red-600 transform rotate-180"
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Expenses</p>
                <p className="font-semibold text-gray-800">
                  ${financialOverview.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiPieChart size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Savings Rate</p>
                <p className="font-semibold text-gray-800">
                  {(
                    ((financialOverview.income - financialOverview.expenses) /
                      financialOverview.income) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Transactions
            </h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              View All <span className="ml-1">→</span>
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-lg mr-3 ${
                      transaction.amount > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? (
                      <FiTrendingUp size={18} />
                    ) : (
                      <FiTrendingUp
                        size={18}
                        className="transform rotate-180"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
