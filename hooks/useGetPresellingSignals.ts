/** Hooks */
import { FiltersNew, PercyResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { isExpired } from "react-jwt"
/** Env Vars */
import { BASE_URL, PRE_SELLING_COUNTERS_ENDPOINT } from "api/constants";

const getPreSellingSignals = async (
  searchParam: string | null,
  filters: FiltersNew,
  token: string,
  refreshToken: string,
): Promise<PercyResponse> => {

  const url = `${BASE_URL}${PRE_SELLING_COUNTERS_ENDPOINT}?query_search=${searchParam ?? ''}`

  const getPresellingCounters = async (token: string) => {

    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ page_size: 200, ...filters }),
    });
  };

  const response = await getPresellingCounters(token);

  if(response.status === 401) {
    console.log("refresh token", refreshToken)
    try {
      const responseRefresh = await fetch(`${BASE_URL}token/refresh/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({refresh: refreshToken})
      })

      const refreshedToken = await responseRefresh.json();

      if(responseRefresh.status === 200) {
          const response = await getPresellingCounters(refreshedToken.access);
          return await response.json();
      }
      
    } catch (error) {
      
    }


  }

  return await response.json();
};

export const useGetPreSellingSignals = (
  searchParam: string | null,
  fetchSignals: boolean,
  filters: FiltersNew,
  signalType: string,
  token: string,
  refreshToken: string,
  status: string,
) =>
  useQuery<PercyResponse, boolean>(
    ["preselling-signal-details", searchParam],
    () => getPreSellingSignals(searchParam, filters, token, refreshToken),
    {
      enabled: !!fetchSignals && signalType === "pre-selling" && status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );
