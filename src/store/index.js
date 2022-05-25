import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './ShoppingCart.store';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});

export default store;
