import { toast } from "sonner";
import { env } from "@/config/env";

type RequestBody = Record<string, unknown> | string | FormData | null;

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: RequestBody;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

let refreshPromise: Promise<boolean> | null = null;

async function handleTokenRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${env.API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Important: sends the refresh_token cookie
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"],
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();
  return `${url}?${queryString}`;
}

export function getServerCookies() {
  if (typeof window !== "undefined") return "";

  return import("next/headers").then(async ({ cookies }) => {
    try {
      const cookieStore = cookies();
      return (await cookieStore)
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
    } catch (error) {
      console.error("Failed to access cookies:", error);
      return "";
    }
  });
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    next,
  } = options;

  let cookieHeader = cookie;
  if (typeof window === "undefined" && !cookie) {
    cookieHeader = await getServerCookies();
  }

  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  const isFormData = body instanceof FormData;

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
  };

  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const requestBody = isFormData
    ? body
    : body
      ? JSON.stringify(body)
      : undefined;

  // Function to execute the actual fetch
  const executeFetch = () =>
    fetch(fullUrl, {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials: "include",
      cache,
      next,
    });

  let response = await executeFetch();

  // --- NEW: Intercept 401 and Refresh ---
  if (
    response.status === 401 &&
    url !== "/auth/refresh" &&
    typeof window !== "undefined"
  ) {
    const success = await handleTokenRefresh();
    if (success) {
      // Retry the original request with the new cookies
      response = await executeFetch();
    } else {
      // If refresh fails, we might want to redirect to login
      // window.location.href = "/login";
    }
  }

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    if (typeof window !== "undefined") {
      toast.error(message);
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(
    url: string,
    body?: RequestBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(
    url: string,
    body?: RequestBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(
    url: string,
    body?: RequestBody,
    options?: RequestOptions,
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
