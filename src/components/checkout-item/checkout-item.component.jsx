import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector.js';
import { 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart 
} from '../../store/cart/cart.action.js';
import { 
    CheckoutContainer, 
    ImageContainer, 
    RemoveButton 
} from './checkout-item.style.jsx';

export default function CheckoutItem({cartItem}) {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    function clearItemHandler() {
        dispatch(clearItemFromCart(cartItems, cartItem));
    }

    function addItemHandler() {
        dispatch(addItemToCart(cartItems, cartItem));
    }

    function removeItemHandler() {
        dispatch(removeItemFromCart(cartItems, cartItem));
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