import React from "react";
import {
  Bell,
  Users,
  DollarSign,
  CreditCard,
  PieChart,
  BarChart2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  MoreVertical,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data - replace with real data from your backend
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12%",
      trend: "up",
      icon: <Users className="text-blue-500" />,
    },
    {
      title: "Active Subscriptions",
      value: "843",
      change: "+5%",
      trend: "up",
      icon: <CreditCard className="text-green-500" />,
    },
    {
      title: "Monthly Revenue",
      value: "$24,890",
      change: "+8.2%",
      trend: "up",
      icon: <DollarSign className="text-purple-500" />,
    },
    {
      title: "Avg. User Balance",
      value: "$3,245",
      change: "-2.1%",
      trend: "down",
      icon: <PieChart className="text-yellow-500" />,
    },
  ];

  const recentActivities = [
    {
      user: "Alex Johnson",
      action: "upgraded to Premium",
      time: "2 min ago",
      amount: "$9.99",
    },
    {
      user: "Sarah Miller",
      action: "added new expense",
      time: "10 min ago",
      amount: "-$125.00",
    },
    {
      user: "Michael Chen",
      action: "connected bank account",
      time: "25 min ago",
      amount: "",
    },
    {
      user: "Emily Wilson",
      action: "set savings goal",
      time: "1 hour ago",
      amount: "$5,000",
    },
    {
      user: "David Kim",
      action: "exported transaction history",
      time: "2 hours ago",
      amount: "",
    },
  ];

  const userGrowthData = [
    30, 45, 60, 80, 100, 120, 150, 180, 210, 240, 280, 320,
  ];
  const revenueData = [
    5000, 8000, 10000, 12000, 15000, 18000, 21000, 24000, 22000, 25000, 28000,
    30000,
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100">
              <RefreshCw className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="text-gray-700 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1 text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div
                className={`mt-4 flex items-center text-sm font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                User Growth
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <div className="h-64">
              {/* Chart placeholder - replace with actual chart library */}
              <div className="h-full flex items-end space-x-1">
                {userGrowthData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                    style={{ height: `${value / 4}px` }}
                    title={`Month ${index + 1}: ${value} users`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly Revenue
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <div className="h-64">
              {/* Chart placeholder - replace with actual chart library */}
              <div className="h-full flex items-end space-x-1">
                {revenueData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-100 hover:bg-green-200 transition-colors"
                    style={{ height: `${value / 1000}px` }}
                    title={`Month ${index + 1}: $${value.toLocaleString()}`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent User Activity
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                {activity.amount && (
                  <p
                    className={`font-medium ${
                      activity.amount.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {activity.amount}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
