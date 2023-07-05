import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.style.jsx';

export default function CartIcon() {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen)


    function toggleIsCartOpen() {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}