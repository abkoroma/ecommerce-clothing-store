import { CartItemContainer, ItemDetails } from './cart-item.style.jsx';

export default function CartItem({ cartItem }) {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} X ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
}