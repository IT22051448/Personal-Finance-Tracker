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

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = http.get(`${BASE_URL}/transaction/incomes`, { headers });

  check(res, {
    "status is 200": () => res.status === 200,
    "response contains incomes": () => Array.isArray(res.json()?.incomes),
  });
}
