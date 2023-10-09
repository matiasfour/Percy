import Image from "next/image";
import { SyntheticEvent, useState } from "react";

import styles from "./styles.module.css";

interface PriceFilterProps {
  value?: string;
  setter: (v: any) => void;
  filterKey: string;
  filterName: string;
}

export function PriceFilter({
  value,
  setter,
  filterName,
  filterKey,
}: PriceFilterProps) {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const openFilter = () => setActiveFilter(true);
  const handleCloseFilter = () => {
    setter((prev: any) => {
      const prevFilters = { ...prev};
      delete prevFilters[filterKey];
      return prevFilters;
    } );
    setActiveFilter(false);
  };
  const onChange = (e: SyntheticEvent) => {
    const formatted = (e.target as HTMLInputElement).value.replace(
      /[,\.\$]/g,
      ""
    );
    const price = Number(formatted);
    if (isNaN(price) || price < 0) return;
    setter((prev: any) => ({
      ...prev,
      [filterKey]: `${price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      })}`,
    }));
  };
  return (
    <>
      <div
        className={`${styles.price_filter_container}  ${
          activeFilter ? "" : styles.hidden
        }`}
      >
        <label className={styles.price_label} htmlFor="price">
          {filterName}
        </label>
        <input type="text" maxLength={18} onChange={onChange} value={value} />
        <button
          onClick={handleCloseFilter}
          className={styles.close_icon_filter}
        >
          <Image
            alt="close-filter-icon"
            src="/x-icon.svg"
            width={15}
            height={15}
          />
        </button>
      </div>
      <button
        className={`${styles.open_filter_label} ${
          activeFilter ? styles.hidden : ""
        }`}
        onClick={openFilter}
      >
        {filterName}
      </button>
    </>
  );
}
