import http from "k6/http";
import { check } from "k6";
import { getToken } from "../auth.js";

const BASE_URL = "http://localhost:5000/api";

export const options = {
  vus: 5,
  duration: "30s",
};

export default function () {
  const token = getToken();

  const payload = JSON.stringify({
    title: "test title",
    amount: 300,
    type: "expense",
    date: "2025-05-19T00:00:00.000Z",
    category: "Utility Bill Payment",
    description: "Test",
    email: "userTest2@gmail.com",
    currency: "LKR",
    isRecurring: false,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = http.post(`${BASE_URL}/transaction/add-income`, payload, {
    headers,
  });

  check(res, {
    "income added": () => res.status === 201,
  });
}
