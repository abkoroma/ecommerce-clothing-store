import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

function addCartItem(cartItems, productToAdd) {
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

function removeCartItem(cartItems, cartItemToRemove) {
    const existingCartItem = cartItems.find(cartItem => 
        cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => 
            cartItem.id !== cartItemToRemove.id
        );
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    );
}

function clearCartItem(cartItems, cartItemToClear) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export function addItemToCart(cartItems, productToAdd) {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export function removeItemFromCart(cartItems, cartItemToRemove) {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export function clearItemFromCart(cartItems, cartItemToClear) {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


