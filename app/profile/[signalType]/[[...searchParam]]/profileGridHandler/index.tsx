"use client";
import { BasicSignal, User } from "@/app/types";
import Datagrid from "@/components/datagrid";
import { SignalsCarousel } from "@/components/signalsCarousel/SignalsCarousel";
import Tabs from "@/components/tabs";
import { totalCountAllSignalsType, unifyNameFields } from "@/utils";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react"

import styles from "./styles.module.css";
import { columns } from "./constants";

import {
  BASE_URL,
  USER_SIGNALS_REPORT_PRE_BUYING,
  USER_SIGNALS_REPORT_PRE_SELLING,
} from "@/api/constants";
interface UrlParams {
  ip?: string;
  user_name?: string;
  user_email?: string;
  domain?: string;
  date_from?: string;
}
interface ProfileGridHandlerProps {
  preSellingSignals: User[];
  preBuyingSignals: User[];
  preSellingCards: BasicSignal[];
  preBuyingCards: BasicSignal[];
  urlParams: UrlParams;
  searchParam: string | null;
  signalType: string;
}

export function ProfileGridHandler({
  preSellingCards,
  preBuyingCards,
  urlParams,
  searchParam,
  signalType,
}: ProfileGridHandlerProps) {
  const [selectedTab, setSelectedTab] = useState(signalType || "pre-selling");
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [fetchUserSignalDetails, setFetchUserSignalDetails] =
    useState<boolean>(false);
  
    const [accessToken, setAccessToken] = useState<string>('')
    const { data: session } = useSession()

  const { user_name, ip, user_email, date_from } = urlParams;

  useEffect(() => {
    //@ts-ignore
    if (!accessToken) setAccessToken(session?.access)
  }, [accessToken, session])

  const handleSignalSelected = (signals: string[]) => {
    setSelectedSignals([...selectedSignals, ...signals]);
    setFetchUserSignalDetails(true);
  };

  const handleOnSignalUnselected = (signal: string) => {
    setSelectedSignals(selectedSignals.filter((s) => s !== signal));
  };

  const datagridData = useCallback(
    async ({ skip, limit }: any) => {
      if (!selectedSignals.length) return;
      const base =
        selectedTab === "pre-buying"
          ? `${BASE_URL}${USER_SIGNALS_REPORT_PRE_BUYING}/details?page_size=${limit || 10}`
          : `${BASE_URL}${USER_SIGNALS_REPORT_PRE_SELLING}/details?query_search=${searchParam ?? ''}&page_size=${limit || 10}`;
      let url = `${base}`;
      if (skip) {
        let page = (skip / 10) + 1
        url = `${url}&page=${page}`;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters: {
            signal_name: selectedSignals,
            date_from: date_from,
            user_email,
            user_name,
            ip,
          }
        }),
      });

      const promise = new Promise((resolve, reject) => {
        response.json().then((data) => {
          const { results, total_count } = data;
          resolve({
            data: unifyNameFields(results),
            count: total_count,
          });
        });
      });
      return promise;
    },
    [selectedSignals, selectedTab, accessToken, date_from, user_email, user_name, ip]
  );

  const tabs = [
    {
      title: `${
        signalType === "pre-selling" ? "Pre-Selling" : "Pre-Buying"
      } signals`,
      content: (
        <div className={styles.tab_container}>
          <span>{totalCountAllSignalsType(signalType === "pre-selling" ? preSellingCards : preBuyingCards)} Total Signals</span>
          <SignalsCarousel
            cards={signalType === "pre-selling" ? preSellingCards : preBuyingCards}
            onCardSelected={handleSignalSelected}
            onCardUnselected={handleOnSignalUnselected}
            allSelected
            filters={{ date_from }} 
            signalsType={signalType}
            selectedSignals={selectedSignals}
          />

          <Datagrid
            columns={columns}
            searchParam={searchParam}
            data={datagridData}
            signalType={signalType}
            disableRowClick
          />
        </div>
      ),
      id: signalType || "pre-selling",
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    />
  );
}
