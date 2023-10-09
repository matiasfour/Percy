/** Hooks */
import { PercyResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

/** Env Vars */
import { BASE_URL, PRE_SELLING_USERS_SIGNALS } from "api/constants";

const getUsersBySearchCriteria = async (
  searchParam: string | null,
  next: string | null,
  refetchUrl: string,
  token: string
): Promise<PercyResponse> => {
  const url = next || `${BASE_URL}${PRE_SELLING_USERS_SIGNALS}?query_search=${searchParam ?? ''}`;
  const response = await fetch(refetchUrl || url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ page_size: 10 }),
  });
  return await response.json();
};

export const useGetUsersBySearchCriteria = (
  searchParam: string | null,
  next: string | null,
  refetchUrl: string,
  token: string
) =>
  useQuery<PercyResponse, boolean>(
    ["users", searchParam, refetchUrl],
    () => getUsersBySearchCriteria(searchParam, next, refetchUrl, token),
    {
      enabled: !!refetchUrl.length,
      refetchOnWindowFocus: false,
    }
  );
