"use client";
import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.css";
import { NavItem } from "./types";
import { getElements } from "./utils";

interface SubsectionProps {
  elements: NavItem[];
  pathname: string | null;
  key: string;
  sectionName?: string;
}

export default function Subsection({
  elements,
  pathname,
  key,
  sectionName,
}: SubsectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSubsecction = () => {
    setIsCollapsed((prev) => !prev);
  };
  return (
    <>
      <li className={styles.nav_li} key={key}>
        <div onClick={toggleSubsecction} className={styles.nav_li_content}>
          <Image
            className={styles.nav_li_icon}
            alt={"section icon"}
            width={20}
            height={20}
            src={"/section.svg"}
          />
          <div className={styles.nav_li_subsecction}>
            {sectionName}
            <Image
              alt={"collapse/expand icon"}
              width={20}
              height={20}
              src={isCollapsed ? "/chevron-down.svg" : "/chevron-up.svg"}
            />
          </div>
        </div>
      </li>

      <ul
        className={
          isCollapsed
            ? styles.nav_ul_subsection_collapsed
            : styles.nav_ul_subsection
        }
      >
        {getElements(elements, pathname, true)}
      </ul>
    </>
  );
}
