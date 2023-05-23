import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import modalsReducer from './modalsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    modals: modalsReducer,
  },
});
