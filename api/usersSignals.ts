import moment from "moment";
import {
  BASE_URL,
  PRE_BUYING_LEAD_COUNTERS_ENDPOINT,
  PRE_SELLING_LEAD_COUNTERS_ENDPOINT,
} from "./constants";
import { Filters, FiltersNew } from "./types";

export async function getUserPreSellingSignalsDetails(
  searchParam: string,
  filters: FiltersNew,
  token: string
) {
  const queryUrl = `${searchParam ? `query_search=${searchParam ?? ''}&` : ""}`;
  const response = await fetch(`${BASE_URL}${PRE_SELLING_LEAD_COUNTERS_ENDPOINT}?${queryUrl}`, {
    next: { revalidate: 600 },
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

  let result = await response.json();
  return result;
}

export async function getUserPreBuyingSignalsDetails(
  searchParam: string,
  filters: FiltersNew,
  token: string
) {
  const queryUrl = `${!!searchParam ? `query_search=${searchParam ?? ''}&` : ""}`;
  const response = await fetch(`${BASE_URL}${PRE_BUYING_LEAD_COUNTERS_ENDPOINT}?${queryUrl}`, {
    next: { revalidate: 600 },
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...filters}),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}
