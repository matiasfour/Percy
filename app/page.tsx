import SearchCard from "@/components/searchCard/SearchCard";
import styles from "./styles.module.css";

export default async function Home(props: any) {
  return (
    <div className={styles.home_container}>
      <SearchCard />
    </div>
  );
}
