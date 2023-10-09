"use client";
import { NavItem } from "./navItem";

import styles from "./styles.module.css";
import { TabItem } from "./tabItem";

interface TabsProps {
  tabs: { id: string; title: string; content: React.ReactNode }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function Tabs({ tabs, selectedTab, setSelectedTab }: TabsProps) {
  return (
    <div className={styles.tab_container}>
      <nav className={styles.tabs_nav}>
        {tabs.map(({ id, title }, index) => (
          <NavItem
            setSelected={setSelectedTab}
            selected={selectedTab === id}
            key={index}
            title={title}
            id={id}
          />
        ))}
      </nav>
      {tabs.map(({ id, content }, index) => (
        <TabItem key={index} id={id} selected={selectedTab === id}>
          {selectedTab === id && content}
        </TabItem>
      ))}
    </div>
  );
}

export * as TabItem from "./tabItem";
