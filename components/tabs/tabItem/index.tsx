import styles from "./styles.module.css";

interface TabItemProps {
  children: React.ReactNode;
  id: string;
  selected: boolean;
}

export function TabItem({ children, id, selected }: TabItemProps) {
  return (
    <div
      id={id}
      className={`${styles.tabItem_container} ${
        selected ? styles.tabItem_selected : ""
      }`}
    >
      {children}
    </div>
  );
}
