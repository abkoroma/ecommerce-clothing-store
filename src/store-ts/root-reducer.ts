import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user-ts/user.reducer";
import { categoriesReducer } from "./categories-ts/category.reducer";
import { cartReducer } from "./cart-ts/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});