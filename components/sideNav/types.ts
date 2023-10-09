export type NavLogo = {
  src: string;
  alt: string;
};

export type NavLink = {
  href: string;
  text: string;
};

export type NavItem = {
  type: string;
  sectionName?: string;
  element: NavLogo | NavLink | NavItem[];
};
