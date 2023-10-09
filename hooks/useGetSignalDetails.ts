/** Hooks */
import { FiltersNew, PercyResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

/** Env Vars */
import { BASE_URL, PRE_BUYING_ENDPOINT, PRE_SELLING_ENDPOINT } from "api/constants";

interface Body {
  page_size?: number;
  date_from?: string;
  date_to?: string;
  beds?: number;
  price_to?: string;
  price_from?: string;
  signal_types?: string[];
}

const getSignalDetails = async (
  filters: FiltersNew,
  signalsType: string,
  searchParam: string | null,
  token: string,
): Promise<PercyResponse> => {
  const endpoint = signalsType === "pre-selling" ? PRE_SELLING_ENDPOINT : PRE_BUYING_ENDPOINT;
  const response = await fetch(`${BASE_URL}${endpoint}/by-date?query_search=${searchParam ?? ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...filters }),
  });
  return await response.json();
};

export const useGetSignalDetails = (
  signalsType: string,
  searchParam: string | null,
  token: string,
  status: string,
  fetchDetails?: boolean,
  filters?: FiltersNew,
) =>
  useQuery(
    ["signal-details", searchParam],
    () => getSignalDetails(filters || {filters: {}}, signalsType, searchParam, token),
    {
      enabled:
        !!Object.values(filters || {filters: {}}).length && fetchDetails === undefined ? true : fetchDetails && status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );
