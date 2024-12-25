type Params = Record<string, string | number | Date | undefined>;

type FetchOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  headers?: HeadersInit;
  params?: Params;
};

const BASE_URL = process.env.NEXT_PUBLIC_URL || "";

const buildUrl = (url: string, params?: Params) => {
  if (!params) return url;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value instanceof Date) {
      searchParams.append(key, value.toISOString());
    } else {
      searchParams.append(key, String(value));
    }
  });
  return `${url}?${searchParams.toString()}`;
};

export default async function fetcher<TResponse = unknown, TBody = unknown>(
  endpoint: string | string[],
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, params } = options;

  const pathname = Array.isArray(endpoint) ? endpoint.join("") : endpoint;

  const url = buildUrl(BASE_URL + pathname, params);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data: TResponse = await response.json();

    if (!response.ok) throw data;

    return data;
  } catch (error) {
    throw error instanceof Object
      ? error
      : new Error(`Failed to fetch: ${endpoint}`);
  }
}
