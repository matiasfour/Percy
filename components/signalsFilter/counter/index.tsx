import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

interface CounterProps {
  value?: number;
  setter: (v: any) => void;
  filterKey: string;
  id: string;
  label: string;
}

export function Counter({ value, setter, id, label, filterKey }: CounterProps) {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const increaseCount = () =>
    setter((prev: any) => ({ ...prev, [filterKey]: value ? value + 1 : 1 }));
  const decreaseCount = () => {
    if (!value || value <= 1) return;
    setter((prev: any) => ({ ...prev, [filterKey]: value ? value - 1 : 1 }));
  };

  const openFilter = () => setActiveFilter(true);
  const handleCloseFilter = () => {
    setter((prev: any) => {
      const prevFilters = { ...prev};
      delete prevFilters[filterKey];
      return prevFilters;
    } );
    setActiveFilter(false);
  };

  return (
    <>
      <div
        className={`${styles.counter_container} ${
          activeFilter ? "" : styles.hidden
        }`}
      >
        <div className={styles.counter_composed_input}>
          <label className={styles.counter_label} htmlFor={id}>
            {label}
          </label>
          <button
            onClick={decreaseCount}
            className={`${styles.counter_btn} ${styles.decrease_btn}`}
          >
            -
          </button>
          <input
            onChange={() => {}}
            id={id}
            type="text"
            min={1}
            value={value}
          />
          <button
            onClick={increaseCount}
            className={`${styles.counter_btn} ${styles.increase_btn}`}
          >
            +
          </button>
        </div>
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
        {label}
      </button>
    </>
  );
}
