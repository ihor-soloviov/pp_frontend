import { createSlice } from '@reduxjs/toolkit';

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, actions) {
      state.products.push({
        preview: actions.payload.preview,
        name: actions.payload.name,
        price: actions.payload.price,
        count: actions.payload.count,
        weight: actions.payload.weight,
      });
    },
  },
});

export const { addProduct } = shoppingCart.actions;

export default shoppingCart.reducer;
