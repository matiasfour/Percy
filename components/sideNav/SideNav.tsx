"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { NavItem } from "./types";
import { getElements } from "./utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface sideNavProps {
  navItems: NavItem[];
}

export default function SideNav({ navItems }: sideNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavBar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={
        isCollapsed
          ? `${styles.nav_container} ${styles.collapsed_navContainer}`
          : `${styles.nav_container}`
      }
    >
      <button onClick={toggleNavBar} className={styles.nav_collapse_button}>
        <Image
          alt={"collapse/expand icon"}
          width={20}
          height={20}
          src={isCollapsed ? "/chevron-right.svg" : "/chevron-left.svg"}
        />
      </button>
      <ul className={styles.nav_ul}>{getElements(navItems, pathname)}</ul>
    </nav>
  );
}
