export type Signal = {
  name: string;
  count: number;
  zipcode: string;
  date: string;
  signal_type?: string;
};

export type BasicSignal = {
  name: string;
  count: number;
};

export type SignalFilter = {
  page_size?: number;
  date_from?: string;
  date_to?: string;
  beds?: number;
  baths?: number;
  price_to?: string;
  price_from?: string;
};

export type Profile = {
  group: string;
  email: string;
  zipcode: string;
  signals: number;
  userid: number;
};

export type User = {
  domain: string;
  user_email: string;
  ip: string;
  user_name: string;
  signal_type: string;
  signals: BasicSignal[];
};

export enum Filters {
  date_from = "Date from",
  date_to = "Date to",
  baths = "Baths",
  beds = "Beds",
  price_from = "Price from",
  price_to = "Price to,",
}

export type Session = {
  access: string;
};
