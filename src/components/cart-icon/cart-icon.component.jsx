import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.style.jsx';

export default function CartIcon() {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    function toggleIsCartOpen() {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}