import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import intlReducer, { IntlState } from "../modules/intl/redux/intlReducer";
import authReducer, { AuthState } from "../modules/auth/redux/authReducer";
import dataReducer, { DataState } from "../modules/common/redux/dataReducer";
import productReducer, {
  ProductState,
} from "../modules/newProduct/redux/productReducer";

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  data: DataState;
  product: ProductState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    data: dataReducer,
    product: productReducer,
  });
}
