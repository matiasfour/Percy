import styles from "./styles.module.css";

export default function LastSearchCard() {
  return (
    <div className={styles.search_card_container}>
      <span className="font-l">Location</span>
      <span className="font-s">By Zipcode</span>
      <span className={styles.search_card_id}>123123</span>
      <div className={styles.search_card_footer}>
        <div className={styles.search_card_hits}>12</div>
        <span className={styles.search_card_time}>Last 12 hours</span>
      </div>
    </div>
  );
}
