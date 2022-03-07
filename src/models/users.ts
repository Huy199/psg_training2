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
