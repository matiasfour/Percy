"use client";

import LineChart, { Dataset } from "@/components/lineChart";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { LINE_COLORS } from "./constants";
import { SignalsFilter } from "@/components/signalsFilter";
import { Signal, SignalFilter, User } from "@/app/types";
import { getLastMonths, getUrlParams, groupByMonthAndSum, nonZeroSignalsNew, totalCountAllSignalsType, } from "@/utils";
import Datagrid from "@/components/datagrid";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"


import {
  BASE_URL,
  PrebuyingTypes,
  PresellingTypes,
  PRE_BUYING_USERS_SIGNALS,
  PRE_SELLING_USERS_SIGNALS,
} from "@/api/constants";
import { SignalsCarousel } from "@/components/signalsCarousel/SignalsCarousel";
import { Filters } from "@/api/types";
import { TypeOnSelectionChangeArg } from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import {useRouter} from "next/navigation";
import { DateFilter } from "@/components/signalsFilter/dateFilter";

import styles from "./styles.module.css";
import GroupingCriteria from "@/components/groupingCriteria/GroupingCriteria";
interface dataGridUsers {
  ip: string;
  email: string;
  name: string;
  signal_type: string;
  domain: string;
  count: number;
}
interface ChartHandlerProps {
  signalsType: string;
  signalsDetails: Signal[];
  cards: any[];
  filters: SignalFilter;
  selectedSignals: string[];
  fetchDetails: boolean;
  setFetchDetails: Dispatch<SetStateAction<any>>;
  selectSignals: Dispatch<SetStateAction<any>>;
  setFilters: (filters: any) => void;
}

export function ChartHandler({
  signalsDetails = [],
  signalsType,
  cards,
  filters,
  selectedSignals,
  setFetchDetails,
  selectSignals,
  setFilters
}: ChartHandlerProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  const { data: session } = useSession()
  
  const [searchFilters, setSearchFilters] = useState<Filters>({});
  const [selectedCriterias, setSelectedCriterias] = useState<string[]>(["ip"]);
  const [sortByColumns, setSortByColumns] = useState({})

  const [gridColumns, setGridColumns] = useState<any>({
    ip: { header: "ip", name: "ip", defaultFlex: 3, key: "ip", visible: true },
    email: { header: "E-mail", name: "user_email", defaultFlex: 3, key: "user_email", visible: false },
    name: { header: "Name", name: "user_name", defaultFlex: 2, key: "user_name", visible: false  },
    signalType: { header: "Signal Type", name: "signal_group", defaultFlex: 2,  key: "signal_group", sortable: false },
    signals: { header: "Signals", name: "signals", defaultFlex: 2, key: "signals",  type: 'number'},
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleSignalSelected = (signalName: string[], isSelected?: boolean) => {
    selectSignals([...selectedSignals, ...signalName]);
  };

  const handleSignalUnselected = (signalName: string) => {
    selectSignals((prev: string[]) =>
      prev.filter((item: string) => item !== signalName)
    );
  };

  const handleCriteriasSelected = (criteriaName: string) => {
    setSelectedCriterias([...selectedCriterias, criteriaName]);
    const selectedCriteria = Object.keys(gridColumns).find(col => gridColumns[col].key === criteriaName)
    if(selectedCriteria) {
      setGridColumns({...gridColumns, [selectedCriteria]: {...gridColumns[selectedCriteria] , visible: true} })
    }
  };

  const handleCriteriasUnselected = (criteriaName: string) => {
    setSelectedCriterias((prev) =>
      prev.filter((item: string) => item !== criteriaName)
    );
    const unselectedCriteria = Object.keys(gridColumns).find(col => gridColumns[col].key === criteriaName)
    if(unselectedCriteria) {
      setGridColumns({...gridColumns, [unselectedCriteria]: {...gridColumns[unselectedCriteria] , visible: false} })
    }
  };

  useEffect(() => {
    if (!accessToken) {
      //@ts-ignore
      setAccessToken(session?.access)
    }
  }, [accessToken, session])

  const searchParam = searchParams && searchParams.get("query_search");
  
  const lastSixMonthsLabels = useMemo(() => getLastMonths(6), []);

  const signalsByMonths = useMemo(
    () => signalsDetails,
    [signalsDetails]
  );
  
  const getDataSets = useMemo(
    (): Dataset[] =>
      selectedSignals.map((signal, index): Dataset => {
        const dataset: Dataset = {
          label: signalsType === "pre-buying" ? PrebuyingTypes[signal as keyof typeof PrebuyingTypes] : PresellingTypes[signal as keyof typeof PresellingTypes],
          data: lastSixMonthsLabels.map((month): number =>
          groupByMonthAndSum(signalsByMonths, month, signal)
          ),
          borderColor: LINE_COLORS[index],
          backgroundColor: LINE_COLORS[index],
        };
        return dataset;
      }),
    [selectedSignals, signalsType, lastSixMonthsLabels, signalsByMonths]
  );

  const applyFilters = () => {
    setFetchDetails(true);
    setSearchFilters(filters);
  }

  const onSelectionchange = ({ data }: TypeOnSelectionChangeArg) => {
    let urlParams: string = "";
    if (data) {
      const { ip, user_name, user_email, domain } = data as User;
      urlParams = getUrlParams({ ip, user_name, user_email, domain, date_from: filters.date_from });
      router.push(`/profile/${signalsType}/${searchParam}?${urlParams}`);
    }
  };

  const datagridData = useCallback(
    async ({ skip, limit }: any) => {
      const base =
        signalsType === "pre-buying"
          ? `${BASE_URL}${PRE_BUYING_USERS_SIGNALS}`
          : `${BASE_URL}${PRE_SELLING_USERS_SIGNALS}`;
      let url = `${base}?query_search=${searchParam ?? ''}&page_size=10`;
      if (skip) {
        let page = (skip / 10) + 1
        url = `${url}&page=${page}`;
      }

      if (accessToken) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            signal_types: selectedSignals, 
            group_by: selectedCriterias,
            sort_by: sortByColumns,
            filters: {
              ...filters,
            }
          }),
        });
  
        const promise = new Promise((resolve, reject) => {
          response.json().then((data) => {
            const { results, total_count: count } = data;
            resolve({ data: results, count });
          });
        });
        return promise;
      }

    },
    [signalsType, searchParam, selectedSignals, accessToken, selectedCriterias, sortByColumns, filters]
  );

  return (
    <>
      <span className={styles.total_signals}>{totalCountAllSignalsType(cards)} Total Signals</span>
      <SignalsFilter
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={applyFilters}
      />
      <DateFilter value={filters.date_from} setter={setFilters} filterKey="date_from" />
      <SignalsCarousel
        cards={nonZeroSignalsNew(cards)}
        onCardSelected={handleSignalSelected}
        onCardUnselected={handleSignalUnselected}
        filters={filters}
        allSelected
        signalsType={signalsType}
        selectedSignals={selectedSignals}
      />
        <>
          <LineChart
            data={{ datasets: getDataSets, labels: lastSixMonthsLabels }}
            searchparam={searchParam}
            filters={filters}
            searchFilters={searchFilters}
          />
          <GroupingCriteria
            onCriteriaSelected={handleCriteriasSelected}
            onCriteriaUnselected={handleCriteriasUnselected}
            selectedCriterias={selectedCriterias}
          />
          <Datagrid
            columns={Object.values(gridColumns)}
            searchParam={searchParam}
            data={datagridData}
            signalType={signalsType}
            onRowSelection={onSelectionchange}
            setSortByColumns={setSortByColumns}
            sortByColumns={sortByColumns}
          />
        </>
    </>
  );
}