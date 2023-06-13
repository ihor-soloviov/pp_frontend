import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import modalsReducer from './modalsSlice';
import shoppingCartReducer from './shoppingCartSlice';
import popupActionsReducer from './popupActionsSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    modals: modalsReducer,
    popupActions: popupActionsReducer,
    shoppingCart: shoppingCartReducer,

  },
});
