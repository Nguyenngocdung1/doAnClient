import { combineReducers } from "redux";

import cartReducer from "./features/cart/cartSlide";
import authReducer from "./features/auths/authSlice"
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
});
export default rootReducer;