import { StaticImageData } from "next/image";

export type PriceProps = {
  active: boolean;
  billing_scheme: string;
  created: 1676975438;
  currency: string;
  custom_unit_amount: null | string;
  id: string;
  livemode: false;
  lookup_key: null;
  metadata: {};
  nickname: null | string;
  object: string;
  product: ProductProps;
  recurring: null;
  tax_behavior: string;
  tiers_mode: null | string;
  transform_quantity: null | string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

export type ProductProps = {
  active: boolean;
  attributes: [];
  created: number;
  default_price: string;
  description: string;
  id: string;
  images: string[] | StaticImageData[];
  livemode: boolean;
  metadata: {};
  name: string;
  object: string;
  package_dimensions: null | string;
  shippable: null | string;
  statement_descriptor: null | string;
  tax_code: null | string | number;
  type: string;
  unit_label: null | string | number;
  updated: number;
  url: null | string;
};

export type titleTypes = "hats" | "jackets" | "sneakers" | "bags" | "watches";

export type ItemPropsType = {
  id: string;
  name: string;
  imageUrl: string | StaticImageData;
  price: number;
  qty: number;
  total: number;
};

// for firebase.ts:
export type UserAuthType = {
  uid?: string | null;
  id?: string | null;
  displayName: string | null;
  email: string | string;
};

export type selectorType = { cartItems: ItemPropsType[]; totalPrice: number };
export type stateItemType = { cartItems: ItemPropsType[]; totalPrice: number; totalItems: number };
