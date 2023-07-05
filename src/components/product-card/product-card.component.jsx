import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component'
import { ProductContainer, Footer } from './product-card.style.jsx'

export default function ProductCard({ product }) {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    function addProductToCart() {
        dispatch(addItemToCart(cartItems, product));
    }

    return (
        <ProductContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPES_CLASSES.inverted} 
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductContainer>
    );
}