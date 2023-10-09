"use client";

import { SignalFilter } from "@/app/types";
import { Counter } from "./counter";
import { PriceFilter } from "./priceFilter";

import styles from "./styles.module.css";

interface FilterProps {
  filters: SignalFilter;
  setFilters: (filters: any) => void;
  handleApplyFilters: () => void;
}

export function SignalsFilter({
  filters,
  setFilters,
  handleApplyFilters,
}: FilterProps) {
  return (
    <div className={styles.filter_bar_container}>
      <div className={styles.filter_bar}>
        <Counter
          value={filters.beds}
          setter={setFilters}
          id={"bedsCounter"}
          filterKey="beds"
          label={"Beds"}
        />
        <Counter
          value={filters.baths}
          setter={setFilters}
          id={"bathsCounter"}
          filterKey="baths"
          label={"Baths"}
        />
        <PriceFilter
          filterName="Price from"
          value={filters.price_from}
          filterKey="price_from"
          setter={setFilters}
        />
        <PriceFilter
          filterName="Price up to"
          value={filters.price_to}
          filterKey="price_to"
          setter={setFilters}
        />
      </div>
      <button onClick={() => handleApplyFilters()} className={styles.apply_button}>Apply</button>
    </div>
  );
}
