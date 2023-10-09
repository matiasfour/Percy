"use client";

import { SignalFilter } from "@/app/types";
import Tabs from "@/components/tabs";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ChartHandler } from "../chartHandler";

import styles from "./styles.module.css";

interface TabHandlerProps {
  signalsDetails: any;
  countPreselling: any;
  countPrebuying: any;
  selectedTab: string;
  filters: SignalFilter;
  fetchDetails: boolean;
  selectedPreselling: string[];
  selectedPrebuying: string[];
  setSelectedPreselling: Dispatch<SetStateAction<any>>;
  setSelectedPrebuying: Dispatch<SetStateAction<any>>;
  setFetchDetails: Dispatch<SetStateAction<any>>;
  setFilters: (filters: any) => void;
  selectTab: Dispatch<SetStateAction<any>>
}
export function TabHandler({
  signalsDetails,
  countPreselling,
  countPrebuying,
  selectedTab,
  filters,
  fetchDetails,
  selectedPreselling,
  selectedPrebuying,
  setSelectedPreselling,
  setSelectedPrebuying,
  setFetchDetails,
  setFilters,
  selectTab,
}: TabHandlerProps) {

  useEffect(() => {
    const sessionTab = sessionStorage.getItem("selectedTab");
    if (sessionTab) {
      selectTab(sessionTab);
    }
  }, [selectTab]);
  const handleTabSelection = (tab: string) => {
    sessionStorage.setItem("selectedTab", tab);
    if (tab !== selectedTab) {
      selectTab(tab);
    }
  };

  const tabs = [
    {
      title: "Pre-Selling signals",
      content: (
        <div className={styles.tab_container}>
          <ChartHandler
            signalsDetails={signalsDetails}
            signalsType="pre-selling"
            cards={countPreselling}
            filters={filters}
            setFilters={setFilters}
            selectedSignals={selectedPreselling}
            selectSignals={setSelectedPreselling}
            fetchDetails={fetchDetails}
            setFetchDetails={setFetchDetails}
          />
        </div>
      ),
      id: "pre-selling",
    },
    {
      title: "Pre-Buying signals",
      content: (
        <div className={styles.tab_container}>
          <ChartHandler
            signalsDetails={signalsDetails}
            signalsType="pre-buying"
            cards={countPrebuying}
            filters={filters}
            setFilters={setFilters}
            selectedSignals={selectedPrebuying}
            selectSignals={setSelectedPrebuying}
            fetchDetails={fetchDetails}
            setFetchDetails={setFetchDetails}
          />
        </div>
      ),
      id: "pre-buying",
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={handleTabSelection}
    />
  );
}
