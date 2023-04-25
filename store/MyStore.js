import { configureStore } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export default store;
