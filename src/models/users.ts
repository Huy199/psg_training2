export interface IUsers {
  access_level: string;
  created: string;
  fistName: string;
  lastName: string;
  last_login: string;
  order: IOrder;
  product: number;
  profile_id: string;
  storeName: null;
  vendor: string;
  vendor_id: string;
  wishlist: string;
  isChecked: boolean;
}
export interface IOrder {
  order_as_buyer: number;
  order_as_buyer_total: string;
}

export interface IUserDetails {
  recordsTotal: number;
  recordsFiltered: number;
  detail: Array<IUserDetail>;
}
export interface IUserDetail {
  profile_id: string;
  vendor: string;
  fistName: string;
  lastName: string;
  created: string;
  last_login: string;
  access_level: string;
  vendor_id: string;
  storeName: string | null;
  product: number;
  order: {
    order_as_buyer: number;
    order_as_buyer_total: number;
  };
  wishlist: number;
}
