export interface IProductFilter {
  search: string;
  category: string;
  stock_status: string;
  availability: string;
  vendor: {};
  sort: string;
  order_by: "ASC" | "DESC";
  search_type: string;
}
export interface IProduct {
  id: string;
  sku: string;
  price: string;
  enabled: string;
  weight: string;
  arrivalDate: string;
  name: string;
  description: string;
  created: string;
  vendor: string;
  vendorID: string;
  amount: string;
  participateSale: string;
  category: string;
  condition: string;
}
export interface IProducts {
  recordsTotal: string;
  recordsFiltered: string;
  user?: {
    profile_id: string;
    login: string;
  };
  data: Array<IProduct>;
}
