import {
  BASE_URL,
  USER_SIGNALS_REPORT_PRE_BUYING,
  USER_SIGNALS_REPORT_PRE_SELLING,
} from "@/api/constants";
import { PercyResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

const getUsersSignalDetails = async (
  body: any,
  signalsType: string,
  searchParam: string | null,
  urlParams: string,
  token: string
): Promise<PercyResponse> => {
  const endpoint =
    signalsType === "pre-selling"
      ? USER_SIGNALS_REPORT_PRE_SELLING
      : USER_SIGNALS_REPORT_PRE_BUYING;
  const response = await fetch(
    `${BASE_URL}${endpoint}/details?query_search=${searchParam ?? ''}&${urlParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  return await response.json();
};

export const useGetUserSignalDetails = (
  signalsType: string,
  urlParams: string,
  fetchData: boolean,
  searchParam: string | null,
  body: any,
  token: string
) =>
  useQuery(
    ["user-signal-details", searchParam],
    () => getUsersSignalDetails(body, signalsType, searchParam, urlParams, token),
    {
      enabled: !!urlParams.length && fetchData,
      refetchOnWindowFocus: false,
    }
  );
