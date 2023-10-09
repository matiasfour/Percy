import { NavItem, NavLink, NavLogo } from "./types";

import Image from "next/image";
import Link from "next/link";
import Subsection from "./Subsection";

import { NAV_TYPES } from "./constants";
import styles from "./styles.module.css";

const getSection = (
  elements: NavItem[],
  pathname: string | null,
  index: number,
  sectionName?: string
) => {
  return (
    <Subsection
      elements={elements}
      pathname={pathname}
      key={`navItem-section-${index}`}
      sectionName={sectionName}
    />
  );
};

const getLink = (
  { href, text }: NavLink,
  pathname: string | null,
  index: number,
  subsection?: boolean
) => {
  return (
    <li className={styles.nav_li} key={`navItem-${index}`}>
      <Link
        className={
          pathname == href
            ? `${styles.nav_li_content} ${styles.nav_li_link_active}`
            : `${styles.nav_li_content}`
        }
        href={href}
      >
        <Image
          className={styles.nav_li_icon}
          alt={"section icon"}
          width={subsection ? 10 : 20}
          height={subsection ? 10 : 20}
          src={subsection ? "/dot.svg" : "/section.svg"}
        />
        {text}
      </Link>
    </li>
  );
};

const getLogo = ({ alt, src }: NavLogo) => {
  return (
    <Image
      className={styles.nav_logo}
      alt={alt}
      width={100}
      height={50}
      src={src}
    />
  );
};

/**
 * @requires an array of NavItems
 * @returns an array of jsx containing next/Links next/Images as logos and ul subsections
 */
export const getElements = (
  items: NavItem[],
  pathname: string | null,
  subsection?: boolean
) => {
  return items.map(({ type, element, sectionName }: NavItem, index: number) => {
    switch (type) {
      case NAV_TYPES.LOGO:
        return getLogo(element as NavLogo);

      case NAV_TYPES.LINK:
        return getLink(element as NavLink, pathname, index, subsection);

      case NAV_TYPES.SECTION:
        const elements = element as NavItem[];
        return getSection(elements, pathname, index, sectionName);
      default:
        throw new Error(`Element ${type} not allowed`);
    }
  });
};
