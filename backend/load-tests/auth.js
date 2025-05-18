import http from "k6/http";
import { check } from "k6";

const BASE_URL = "http://localhost:5000/api";

export function getToken() {
  const payload = JSON.stringify({
    username: "userTest2",
    password: "userTest2",
  });

  const res = http.post(`${BASE_URL}/auth/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  const body = res.json();
  const token = body.token;

  check(res, {
    "logged in": () => res.status === 200 && token !== undefined,
  });

  return token;
}
