import http from "k6/http";
import { getToken } from "../auth.js";

const BASE_URL = "http://localhost:5000/api";

export default function () {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  console.log("Headers: ", headers);

  const res = http.get(`${BASE_URL}/transaction/incomes`, { headers });

  const data = res.json();
  const incomes = data?.incomes || [];

  incomes
    .filter(e => e.description === "Test")
    .forEach(e => {
      const delRes = http.del(`${BASE_URL}/transaction/income/${e._id}`, null, {
        headers,
      });
      console.log(`Deleted ${e._id}, status: ${delRes.status}`);
      console.log("Response body:", delRes.body); // Logs the full response
    });
}
