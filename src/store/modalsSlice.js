import { createSlice } from '@reduxjs/toolkit';

const modals = createSlice({
  name: 'modals',
  initialState: {
    authModal: false,
    cityModal: true,
    thanksModal: false,
  },
  reducers: {
    authModalUpdateState(state, actions) {
      state.authModal = actions.payload.isOpen;
    },
    cityModalUpdateState(state, actions) {
      state.cityModal = actions.payload.isOpen;
    },
    thanksModalUpdateState(state, actions) {
      state.thanksModal = actions.payload.isOpen;
    },
  },
});

export const {
  authModalUpdateState,
  cityModalUpdateState,
  thanksModalUpdateState,
} = modals.actions;

export default modals.reducer;
