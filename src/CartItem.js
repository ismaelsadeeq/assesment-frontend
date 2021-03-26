import React from 'react'
import { useGlobalContext } from './context'
const CartItem = ({ id, product_name,product_description, product_varieties,}) => {
  const {remove,add_to_cart} = useGlobalContext()
  return (

    <article className='cart-item'>
      <img src={'http://127.0.0.1:3001/'+product_varieties.image[0]} alt={product_name} />
      <div>
        <h4>{product_name}</h4>
        <p>{product_description}</p>
        <h4 className='item-price'>${product_varieties.price}</h4>
        {/* remove button */}
        <button
          className='remove-btn'
          onClick={() => remove(id)}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button className='amount' onClick={() => add_to_cart(id)}>
          Add to cart
        </button>
        {/* amount */}
        <p className='amount'>{product_varieties.amount}</p>
      </div>
    </article>
  )
}

export default CartItem
