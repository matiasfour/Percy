"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LineChartData } from "./types";

import styles from "./styles.module.css";
import { Filters } from "@/api/types";
import { Filters as filterKeys } from "@/app/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export interface LineChartProps {
  data: LineChartData;
  searchparam: string | null;
  filters: Filters;
  searchFilters: Filters;
}

const listFilters = (filters: Filters) => {
  return Object.keys(filters).map((filter, index) => `${index !== 0 ? ',' : ''}  ${filterKeys[filter as keyof typeof filterKeys]}: ${filters[filter as keyof Filters]}`);
}

export default function LineChart({ data, searchparam, searchFilters }: LineChartProps) {
  return (
    <>
      <div className={styles.chart_container}>
        <div className={styles.chart_header}>
          <div>
            <span className={`${styles.chart_caption} font-xs`}>
              Signals gathered for: {searchparam}{ searchFilters && listFilters(searchFilters)}
            </span>
          </div>
        </div>
        <div className={styles.line_chart}>
          {!!data.datasets.length && <Line options={options} data={data} />}
        </div>
      </div>
    </>
  );
}
