export type PercyResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
};

export interface PaginationInterface {
  count: number;
  next: string | null;
  previous: string | null;
}

export type Filters = {
    beds?: number;
    baths?: number;
    price_from?: string;
    price_to?: string;
    date_from?: string;
    date_to?: string;
    signal_name?: string[];
}

export type FiltersNew = {
  filters: {
      beds?: number;
      baths?: number;
      price_from?: string;
      price_to?: string;
      date_from?: string;
      date_to?: string;
      signal_types?: string[];
      ip?: string;
      user_email?: string;
      user_name?: string;
      searchParam?: string;
  };
};
