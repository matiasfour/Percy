import { getTimePeriod } from "@/utils";
import styles from "./styles.module.css";

interface DateFilterProps {
  setter: (v: any) => void;
  value?: string;
  filterKey: string;
}

export function DateFilter({ setter, value, filterKey }: DateFilterProps) {
  return (
    <div className={styles.date_filter} id="date">
          <button className={`${styles.button} ${value === getTimePeriod("Last 3 Month") ?  styles.button_selected : ''}`}  onClick={() => setter((prev: any) => ({ ...prev, [filterKey]: getTimePeriod("Last 3 Month")}))}>Last 3 Month</button>
          <button className={`${styles.button} ${value === getTimePeriod("Last 6 Month") ?  styles.button_selected : ''}`} onClick={() => setter((prev: any) => ({ ...prev, [filterKey]:  getTimePeriod("Last 6 Month")}))}>Last 6 Month</button>
          <button className={`${styles.button} ${value === getTimePeriod("Last 9 Month") ?  styles.button_selected : ''}`} onClick={() => setter((prev: any) => ({ ...prev, [filterKey]:  getTimePeriod("Last 9 Month")}))}>Last 9 Month</button>
          <button className={`${styles.button} ${value === getTimePeriod("Last Year") ?  styles.button_selected : ''}`} onClick={() => setter((prev: any) => ({ ...prev, [filterKey]:  getTimePeriod("Last Year")}))}>Last Year</button>
    </div>
  );
}


