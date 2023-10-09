import moment from "moment";
import { BASE_URL, PRE_BUYING_ENDPOINT, PRE_PREBUYING_COUNTERS_ENDPOINT } from "./constants";
import { Filters, FiltersNew } from "./types";

export async function getPreBuyingSignals(searchParam: string, filters: Filters, token: string) {
  const response = await fetch(`${BASE_URL}${PRE_BUYING_ENDPOINT}?query_search=${searchParam ?? ''}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...filters, page_size: 400 }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function getPreBuyingSignalsCount(searchParam: string, filters: Filters, token: string) {
  const response = await fetch(`${BASE_URL}${PRE_PREBUYING_COUNTERS_ENDPOINT}?query_search=${searchParam ?? ''}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...filters }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  
  const result = await response.json();
  return result
}

export async function getPreBuyingSignalsDetails(
  searchParam: string,
  filters: FiltersNew,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}${PRE_BUYING_ENDPOINT}/lead/details`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...filters}),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
