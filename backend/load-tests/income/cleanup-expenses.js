import http from "k6/http";
import { getToken } from "../auth.js";

const BASE_URL = "http://localhost:5000/api";

export default function () {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const res = http.get(`${BASE_URL}/transaction/expenses`, { headers });

  const data = res.json();
  const expenses = data?.expenses || []; // ✅ correctly get the array

  expenses
    .filter(e => e.description === "Test") // filter your load-test data
    .forEach(e => {
      const delRes = http.del(`${BASE_URL}/transactions/expense/${e._id}`, {
        headers,
      });
      console.log(`Deleted ${e._id}, status: ${delRes.status}`);
    });
}
