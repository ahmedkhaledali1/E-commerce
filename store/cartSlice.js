import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
    totalQuantity: Cookies.get('total') ? Cookies.get('total') : 0,
    shipingAdress: Cookies.get('shipingAdress')
      ? Cookies.get('shipingAdress')
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },

  reducers: {
    AddItemToCart(state, action) {
      const newItem = action.payload;
      const exitingItem = state.items.find(
        (item) => item.slug === newItem.slug
      );

      state.totalQuantity++;

      if (!exitingItem) {
        state.items.push({
          slug: newItem.slug,
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price * newItem.quantity,
          image: newItem.image,
        });
      } else {
        exitingItem.quantity++;
      }
      Cookies.set('cart', JSON.stringify(state.items));
      Cookies.set('total', JSON.stringify(state.totalQuantity));
    },
    RemoveItemFromCart(state, action) {
      const slug = action.payload;
      const exitingItem = state.items.find((item) => item.slug === slug);
      state.totalQuantity--;

      if (exitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.slug !== slug);
      } else {
        exitingItem.quantity--;
      }

      Cookies.set('cart', JSON.stringify(state.items));
      Cookies.set('total', JSON.stringify(state.totalQuantity));
    },
    cartReset(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.shipingAdress = {};
      state.paymentMethod = '';
      Cookies.remove('total');
      Cookies.remove('cart');
      Cookies.remove('shipingAdress');
      Cookies.remove('paymentMethod');
    },
    cartClearItems(state) {
      state.items = [];
      state.totalQuantity = 0;
      Cookies.remove('total');
      Cookies.remove('cart');
    },

    saveShipingAdress(state, action) {
      state.shipingAdress = action.payload;
      Cookies.set('shipingAdress', JSON.stringify(state.shipingAdress));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      Cookies.set('paymentMethod', JSON.stringify(state.paymentMethod));
    },
  },
});

export const cartAcions = cartSlice.actions;
export default cartSlice;
