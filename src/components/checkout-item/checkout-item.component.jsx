import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutContainer, ImageContainer, RemoveButton } from './checkout-item.style.jsx';

export default function CheckoutItem({cartItem}) {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    function clearItemHandler() {
        clearItemFromCart(cartItem);
    }

    function addItemHandler() {
        addItemToCart(cartItem);
    }

    function removeItemHandler() {
        removeItemFromCart(cartItem);
    }

    return (
        <CheckoutContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{ quantity * price}</span>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutContainer>
    );
}