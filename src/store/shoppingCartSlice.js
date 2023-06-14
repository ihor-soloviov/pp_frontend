import { createSlice } from '@reduxjs/toolkit';

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, actions) {
      const product = {
        preview: actions.payload.preview,
        name: actions.payload.name,
        price: actions.payload.price,
        count: actions.payload.count,
        weight: actions.payload.weight,
        id: state.products.length,
        ingredients: state.products.ingredients
      };
      product.totalPrice = product.price * product.count;

      state.products.push(product);
    },
    removeProduct(state, actions) {
      state.products = state.products.filter(
        (product) => product.id !== actions.payload.id
      );
    },
    updateCount(state, actions) {
      // const elem = state.products.find(el => el.id === actions.payload.id)
      state.products[actions.payload.id].count = actions.payload.count;
      state.products[actions.payload.id].totalPrice =
        state.products[actions.payload.id].price * actions.payload.count;
    },
  },
});

export const { addProduct, removeProduct, updateCount } = shoppingCart.actions;

export default shoppingCart.reducer;
