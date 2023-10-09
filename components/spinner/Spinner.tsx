import styles from "./styles.module.css";

export function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <span className="font xxl">Loading...</span>
      <div className={styles.spinner}></div>
    </div>
  );
}
