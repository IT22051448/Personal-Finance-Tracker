import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 20,
  duration: "30s",
};

const BASE_URL = "http://localhost:5000";

function login() {
  const payload = JSON.stringify({
    username: "userTest2",
    password: "userTest2",
  });

  const headers = { "Content-Type": "application/json" };
  const res = http.post(`${BASE_URL}/api/auth/login`, payload, { headers });

  const token = res.json("token");

  check(res, {
    "logged in successfully": () => res.status === 200 && token !== undefined,
  });

  return token;
}

export default function () {
  const token = login();

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = http.get(`${BASE_URL}/api/users/me`, authHeaders);

  check(res, {
    "authenticated request succeeded": r => r.status === 200,
  });

  sleep(1);
}
