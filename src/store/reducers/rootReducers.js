// src/store/reducers/index.js

import { combineReducers } from "redux";
import productReducer from "./products";
import { cartReducer } from "./cart";
import { wishListReducer } from "./wishList";
import compareListReducer from "./compare";
import authReducer from "./authReducer"; // 1. Import the new reducer

const rootReducer = combineReducers({
  data: productReducer,
  cartList: cartReducer, // Your key is 'cartList', not 'cart'
  wishList: wishListReducer,
  compareList: compareListReducer,
  auth: authReducer, // 2. Add the auth reducer to the state
});

export default rootReducer;
