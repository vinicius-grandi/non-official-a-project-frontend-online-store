import { createSlice } from "@reduxjs/toolkit";

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState: {
    totalQuantity: 0,
    productInfo: {},
    totalPrice: 0,
  },
  reducers: {
    addProduct (state, product) {
      const { id, title, thumbnail, available_quantity, price } = product.payload;

      if (
        state.productInfo[id]
        && state.productInfo[id].quantity + 1 > available_quantity) {
        return;
      }

      state.productInfo[id] = {
        title,
        id,
        thumbnail,
        price,
        available_quantity,
        quantity: state.productInfo[id] === undefined ? 1 : state.productInfo[id].quantity + 1,
      };

      state.totalQuantity += 1;
      state.totalPrice = Math.round((state.totalPrice + price) * 100) / 100;
    },

    removeProduct (state, product) {
      const { id, price } = product.payload;

      if (state.productInfo[id].quantity - 1 <= 0) {
        delete state.productInfo[id];
      } else {
        state.productInfo[id].quantity -= 1;
      }

      state.totalQuantity -= 1;
      state.totalPrice = Math.round((state.totalPrice - price) * 100) / 100;
    },
    addProductByQuantity (state, product) {
      const { id, title, thumbnail, available_quantity, price, quantity } = product.payload;

      state.productInfo[id] = {
        title,
        id,
        thumbnail,
        price,
        available_quantity,
        quantity: state.productInfo[id] === undefined ? 1 : state.productInfo[id].quantity + quantity,
      };
      state.totalQuantity += quantity;
      state.totalPrice += Math.round(price * quantity * 100) / 100;
      console.log(state.totalPrice);
    },
  },
});

export const { addProduct, removeProduct, addProductByQuantity } = shoppingCart.actions;

export default shoppingCart.reducer;
