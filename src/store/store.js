import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import modalsReducer from './modalsSlice';
import shoppingCartReducer from './shoppingCartSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    modals: modalsReducer,
    shoppingCart: shoppingCartReducer,
  },
});
