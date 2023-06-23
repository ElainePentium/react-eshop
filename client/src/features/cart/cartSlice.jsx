import { createSlice } from '@reduxjs/toolkit'

// const localCart = JSON.parse(localStorage.getItem('cart')) ;

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart'))
  },
  reducers: {
    addToCart: (state, action) => {
        if(state.cart) {
            state.cart.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
        else {
            state.cart = [];
            state.cart.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    removeFromCart: (state, action) => {
        state.cart.splice(action.payload, 1);
        if (state.cart.length === 0) {
            state.cart = null;
            localStorage.clear()
        }
        else {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    emptyCart: (state) => {
        state.cart = null;
        localStorage.clear()
    }
    }
  },
)

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer