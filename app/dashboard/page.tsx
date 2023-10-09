"use client";

import SearchCard from "@/components/searchCard/SearchCard";
import styles from "./styles.module.css";
import { TabHandler } from "./tabHandler";
import { getTimePeriod, nonZeroSignalsNew } from "@/utils";
import moment from "moment";
import { PrebuyingTypes, PresellingTypes } from "@/api/constants";
import { useGetSignalDetails } from "@/hooks/useGetSignalDetails";
import { useEffect, useMemo, useState } from "react";
import { SignalFilter } from "../types";
import { useGetPrebuyingSignals } from "@/hooks/useGetPrebuyingSignals";
import { useGetPreSellingSignals } from "@/hooks/useGetPresellingSignals";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'
import { Spinner } from "@/components/spinner/Spinner";


export default function LeadsPage() {

  const { data: session, status } = useSession();

  //@ts-ignore
  const access = session?.access || '';
  //@ts-ignore
  const refreshToken = session?.refresh
  const searchParams = useSearchParams();
  const querySearch =  searchParams?.get('query_search') || '';

  const [selectedTab, setSelectedTab] = useState<string>("pre-selling");
  const [fetchDetails, setFetchDetails] = useState<boolean>(true);
  const [selectedPreselling, setSelectedPreselling] = useState<string[]>(Object.keys(PresellingTypes) as string[]);
  const [selectedPrebuying, setSelectedPrebuying] = useState<string[]>( Object.keys(PrebuyingTypes) as string[]);


  const [filters, setFilters] = useState<SignalFilter>({
    date_from: getTimePeriod("Last 6 Month"),
    date_to: moment().format("YYYY-MM-DD"),
  });
 
  const { data: chartSignals, isFetching} = useGetSignalDetails(
    selectedTab,
    querySearch,
    access,
    status,
    fetchDetails,
    {
      filters: {
        ...filters, signal_types: selectedTab === "pre-selling" ? selectedPreselling : selectedPrebuying 
      }
    },
  );

  const { data: preSellingSignals, isFetching: isFetchingPreselling} = useGetPreSellingSignals(
    querySearch,
    fetchDetails,
    {
      filters: {
        ...filters, signal_types: selectedPreselling
      }
    },
    selectedTab,
    access,
    refreshToken,
    status,
  );

  const { data: preBuyingSignals, isFetching: isFetchingPrebuying} = useGetPrebuyingSignals(
    querySearch,
    fetchDetails,
    {
      filters: {
        ...filters, signal_types: selectedPrebuying
      }
    },
    selectedTab,
    access,
    status,
  );

  useEffect(() => {
    //@ts-ignore
    if (session?.error === "RefreshAccessTokenError") {
      signIn()
    }
  }, [session]);

  useEffect(() => {
    setFetchDetails(true);
  }, [querySearch, selectedTab])
  

  useEffect(() => {
    // Hacky momentary solution to avoid having to change filter comp to uncontrolled form
    if (fetchDetails && isFetching) {
      setFetchDetails(false);
    }
    if((fetchDetails && isFetchingPreselling) || (fetchDetails && isFetchingPrebuying)) {
      setFetchDetails(false);
    }
  }, [fetchDetails, isFetching, isFetchingPreselling, isFetchingPrebuying, filters]);

  const filteredSignals = useMemo(
    () => 
        selectedTab === "pre-buying"
        ?  nonZeroSignalsNew(preBuyingSignals)
        :  nonZeroSignalsNew(preSellingSignals)
    ,
    [selectedTab, preBuyingSignals, preSellingSignals]
  );

  return (
    <div className={styles.leads_container}>
      <SearchCard searchedParams={querySearch} setFetchDetails={setFetchDetails} />
      {
        isFetching || isFetchingPreselling || isFetchingPrebuying ? (
          <Spinner/>
        ) : (
          <TabHandler
            signalsDetails={chartSignals}
            countPreselling={filteredSignals}
            countPrebuying={filteredSignals}
            selectedTab={selectedTab}
            selectTab={setSelectedTab}
            filters={filters}
            setFilters={setFilters}
            setSelectedPreselling={setSelectedPreselling}
            selectedPreselling={selectedPreselling}
            selectedPrebuying={selectedPrebuying}
            setSelectedPrebuying={setSelectedPrebuying}
            fetchDetails={fetchDetails}
            setFetchDetails={setFetchDetails}
          />
        )
      }
    </div>
  );
}
