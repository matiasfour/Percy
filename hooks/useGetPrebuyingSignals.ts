/** Hooks */
import { Filters, FiltersNew, PercyResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

/** Env Vars */
import { BASE_URL, PRE_BUYING_ENDPOINT, PRE_PREBUYING_COUNTERS_ENDPOINT } from "api/constants";

const getPrebuyingSignals = async (
  searchParam: string | null,
  filters: FiltersNew,
  token: string
): Promise<PercyResponse> => {
  const response = await fetch(`${BASE_URL}${PRE_PREBUYING_COUNTERS_ENDPOINT}?query_search=${searchParam ?? ''}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ page_size: 200, ...filters }),
  });
  return await response.json();
};

export const useGetPrebuyingSignals = (
  searchParam: string | null,
  fetchSignals: boolean,
  filters: FiltersNew,
  signalType: string,
  token: string,
  status: string,
) =>
  useQuery<PercyResponse, boolean>(
    ["prebuying-signal-details", searchParam],
    () => getPrebuyingSignals(searchParam, filters, token),
    {
      enabled: !!fetchSignals && signalType === "pre-buying" && status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );
