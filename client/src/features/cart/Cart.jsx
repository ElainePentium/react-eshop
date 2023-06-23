import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {
  
  const cart = useSelector((state) => (state.cart))
  return (
    <div>Cart 
      {cart}
    </div>
  )
}

export default Cart