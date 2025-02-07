import Image from '../../assets/pizza.jpg';
import { FaXmark } from 'react-icons/fa6';
import './CartItem.scss';
import { useState } from 'react';

export default function CartItem() {
    const [quantity, setQuantity] = useState(1);

  return (
    <div className='cart-item'>
            <div className="preview-image">
                <img src={Image} alt=""/>
            </div>
            <p className="item-name">Product Description Goes here.....</p>
            <input type="number" value={quantity} min="0" max="99" className='quantity' onChange={(e) => setQuantity(e.target.value)}></input>
            <h2 className="multiply">x200</h2>
            <p className="total">{200 * quantity}</p>
            <span className="remove"><FaXmark /></span>
    </div>
  )
}