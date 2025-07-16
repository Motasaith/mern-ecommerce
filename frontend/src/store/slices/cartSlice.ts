import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Address } from '../../types';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  shippingAddress: null,
  paymentMethod: 'Stripe',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product === action.payload.product);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.product === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    
    setShippingAddress: (state, action: PayloadAction<Address>) => {
      state.shippingAddress = action.payload;
    },
    
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingAddress,
  setPaymentMethod,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
