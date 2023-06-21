import { createSlice } from '@reduxjs/toolkit';

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, actions) {
      const existingProduct = state.products.find(
        (value) => value.id === actions.payload.id
      );

      if (existingProduct) {

        existingProduct.count += 1;
        existingProduct.totalPrice =
          existingProduct.price * existingProduct.count;
      } else {
        const product = {
          preview: actions.payload.preview,
          name: actions.payload.name,
          price: actions.payload.price,
          count: actions.payload.count,
          weight: actions.payload.weight,
          cart_index: state.products.length,
          id: actions.payload.id,
          ingredients: state.products.ingredients,
        };

        product.totalPrice = product.price * product.count;
        state.products.push(product);
      }

      localStorage.setItem('shoppingCart', JSON.stringify(state.products));
    },
    removeProduct(state, actions) {
      state.products = state.products.filter(
        (product) => product.id !== actions.payload.id
      );
      localStorage.setItem('shoppingCart', JSON.stringify(state.products));
    },
    updateCount(state, actions) {
      const elem = state.products.find(
        (el) => el.cart_index === actions.payload.cart_index
      );
      state.products[actions.payload.cart_index].count = actions.payload.count;
      state.products[actions.payload.cart_index].totalPrice =
        state.products[actions.payload.cart_index].price *
        actions.payload.count;
      localStorage.setItem('shoppingCart', JSON.stringify(state.products));
    },
    getFromLocalStorage(state) {
      const data = localStorage.getItem('shoppingCart');
      const dataParse = JSON.parse(data);
      if (dataParse !== null) {
        state.products = JSON.parse(data);
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateCount,
  getFromLocalStorage,
} = shoppingCart.actions;

export default shoppingCart.reducer;
