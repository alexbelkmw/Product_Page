import type { SortConfig } from "@/lib/types";
import { showUser } from "@/lib/utils";

const BASE_URL = "https://dummyjson.com/";

interface requestOptions {
  endpoint: string;
  method?: string;
  data?: object;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface userData {
  login: string;
  password: string;
}

async function request({
  endpoint,
  data = {},
  params = {},
  headers,
  method = "GET",
}: requestOptions) {
  try {
    const url = new URL(BASE_URL + endpoint);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json", ...headers },
      body: method === "GET" ? undefined : JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

export async function getUser({ login, password }: userData) {
  return await request({
    endpoint: "auth/login",
    data: {
      username: login,
      password,
    },
    method: "POST",
  });
}

export async function checkUser() {
  const token = showUser()?.accessToken ?? "";
  return await request({
    endpoint: "auth/me/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProducts(sort: SortConfig) {
  const token = showUser()?.accessToken ?? "";
  return await request({
    endpoint: "products",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: "20",
      sortBy: sort.key ?? "",
      order: sort.order,
    },
  });
}
