import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export function cartReducer(state = CART_INITIAL_STATE, action = {}) {
    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default: {
            return state;
        }
    }
}

/*
export const cartSlice = creatSlice({
    name: 'cart',
    initialState: 'CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        }
    }
})
export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart }
    =cartSlice.actions;
export const cartReducer = cartSlice.reducer;
*/