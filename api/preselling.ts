import { BASE_URL, PRE_SELLING_COUNTERS_ENDPOINT, PRE_SELLING_ENDPOINT } from "./constants";
import { Filters, FiltersNew } from "./types";

export async function getPreSellingSignals(searchParam: string, filters: Filters, token: string) {
  const response = await fetch(`${BASE_URL}${PRE_SELLING_ENDPOINT}?query_search=${searchParam ?? ''}`, {
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

  const result = await response.json();
  return result;
}

export async function getPreSellingSignalsCount(searchParam: string, filters: Filters, token: string) {
  const response = await fetch(`${BASE_URL}${PRE_SELLING_COUNTERS_ENDPOINT}?query_search=${searchParam ?? ''}`, {
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


export async function getPreSellingSignalsDetails(
  searchParam: string,
  filters: FiltersNew,
  token: string
) {
  
  const response = await fetch(
    `${BASE_URL}${PRE_SELLING_ENDPOINT}/lead/details`,
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

  const result = await response.json();
  return result;
}
