import { useContext } from 'react';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';
import { ProductContainer, Footer } from './product-card.style.jsx'

export default function ProductCard({ product }) {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    function addProductToCart() {
        addItemToCart(product);
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