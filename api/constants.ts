import moment from "moment";

//agregar BACKEND_IP ENV en url
export const BASE_URL = process.env.API_URL;

export const PRE_BUYING_ENDPOINT = "v1/prebuying";

export const PRE_SELLING_ENDPOINT = "v1/preselling";

export const PRE_SELLING_USERS_SIGNALS = "v1/preselling/leads";

export const PRE_BUYING_USERS_SIGNALS = "v1/prebuying/leads";

export const PRE_SELLING_COUNTERS_ENDPOINT = "v1/preselling/counters"

export const PRE_PREBUYING_COUNTERS_ENDPOINT = "v1/prebuying/counters"

export const PRE_SELLING_LEAD_COUNTERS_ENDPOINT = "v1/preselling/lead/counters"

export const PRE_BUYING_LEAD_COUNTERS_ENDPOINT = "v1/prebuying/lead/counters"

export const USER_SIGNALS_REPORT_PRE_SELLING =
  "v1/preselling/lead";
export const USER_SIGNALS_REPORT_PRE_BUYING =
  "v1/prebuying/lead";

const body = {
  page_size: 200,
  date_from: moment().subtract(6, "months").format("YYYY-MM-DD"),
  date_to: moment().format("YYYY-MM-DD"),
};


export enum PresellingTypes {
  inquired_about_selling = 'Inquired about selling',
  updated_property_details = 'Updated property details',
  shared_their_home = 'Shared their home',
  interest_in_valuation = 'Interest in valuation',
  updated_mortgage_details = 'Updated mortgage details',
  interest_in_equity_refi = 'Interest in equity refi',
  interest_in_market = 'Interest in market',
  bma = 'BMA',
  cma = 'CMA',
  quiet = 'Quiet',
  coming_soon = 'Coming soon',
  address_listed_mls = 'Address listed MLS',
  listing_performance_report = 'Listing performance report',
  under_contract_sell = 'Under contract sell',
  contingent_sell = 'Contingent sell',
  pending_sell = 'Pending sell',
  address_sold = 'Address sold',
}

export enum PrebuyingTypes {
    agent_created_buyer = 'Agent created buyer',
    showing = 'Showing',
    saved_prop = 'Saved prop',
    open_house = 'Open house',
    saved_search = 'Saved search',
    inquiry_buy = 'Inquiry buy',
    view = 'View',
}


