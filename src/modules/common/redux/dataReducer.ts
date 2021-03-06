import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { IProducts } from "../../../models/product";
import { ICategory } from "../../../models/category";
import {
  ICountry,
  IState,
  IUserCommonRole,
  IUserDetails,
  IUserDetail,
} from "../../../models/user";

export interface DataState {
  loadingData: boolean;
  commonsRole?: IUserCommonRole;
  users?: IUserDetails;
  countries?: Array<ICountry>;
  states?: Array<IState>;
  pageInfo: { index: number; count: number };
  pageProduct: { index: number; count: number };
  products?: IProducts;
  categories?: Array<ICategory>;
  userDetail?: IUserDetail;
}

export const setLoading = createCustomAction(
  "data/loading",
  (loading: boolean) => ({
    loading,
  })
);
export const setCommonsRole = createCustomAction(
  "data/setCommonsRole",
  (data: IUserCommonRole) => ({
    data,
  })
);
export const setUsers = createCustomAction(
  "data/setUsers",
  (data: IUserDetails) => ({
    data,
  })
);
export const setCountries = createCustomAction(
  "data/setCountries",
  (data: Array<ICountry>) => ({
    data,
  })
);
export const setStates = createCustomAction(
  "data/setStates",
  (data: Array<IState>) => ({
    data,
  })
);
export const setPageInfo = createCustomAction(
  "data/setPageInfo",
  (data: { index: number; count: number }) => ({
    data,
  })
);
export const setPageProduct = createCustomAction(
  "data/setPageProduct",
  (data: { index: number; count: number }) => ({
    data,
  })
);
export const setProducts = createCustomAction(
  "data/setProducts",
  (data: IProducts) => ({
    data,
  })
);
export const setCategories = createCustomAction(
  "data/setCategories",
  (data: Array<ICategory>) => ({
    data,
  })
);
export const setUserDetail = createCustomAction(
  "data/setUserDetail",
  (data: IUserDetail) => ({
    data,
  })
);
const actions = {
  setLoading,
  setCommonsRole,
  setUsers,
  setCountries,
  setStates,
  setPageInfo,
  setProducts,
  setPageProduct,
  setCategories,
  setUserDetail,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: DataState = {
    loadingData: false,
    pageInfo: { index: 1, count: 25 },
    pageProduct: { index: 1, count: 25 },
  },
  action: Action
) {
  switch (action.type) {
    case getType(setLoading):
      return { ...state, loadingData: action.loading };
    case getType(setCommonsRole):
      return { ...state, commonsRole: action.data };
    case getType(setUsers):
      return { ...state, users: action.data };
    case getType(setCountries):
      return { ...state, countries: action.data };
    case getType(setStates):
      return { ...state, states: action.data };
    case getType(setPageInfo):
      return { ...state, pageInfo: { ...action.data } };
    case getType(setProducts):
      return { ...state, products: { ...action.data } };
    case getType(setPageProduct):
      return { ...state, pageProduct: { ...action.data } };
    case getType(setCategories):
      return { ...state, categories: action.data };
    case getType(setUserDetail):
      return { ...state, userDetail: action.data };
    default:
      return state;
  }
}
