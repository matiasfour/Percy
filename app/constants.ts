import { NAV_TYPES } from "@/components/sideNav";

export const SESSION = {
  LOADING: "loading",
};

export const NAV_ELEMENTS = [
  {
    element: { alt: "Percy logo", src: "/side-menu-header.svg" },
    type: NAV_TYPES.LOGO,
  },
  { element: { text: "Leads", href: "/dashboard" }, type: NAV_TYPES.LINK },
  { element: { text: "Graphics", href: "/graphics" }, type: NAV_TYPES.LINK },
  {
    sectionName: "profiles",
    element: [
      {
        element: { text: "Buyers", href: "/profiles/buyer" },
        type: NAV_TYPES.LINK,
      },
      {
        element: { text: "Seller", href: "/profiles/seller" },
        type: NAV_TYPES.LINK,
      },
    ],
    type: NAV_TYPES.SECTION,
  },
  {
    element: { text: "Saved Leads/Opportunities", href: "/opportunities" },
    type: NAV_TYPES.LINK,
  },
];
