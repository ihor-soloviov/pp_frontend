import { createSlice } from '@reduxjs/toolkit';

const modals = createSlice({
  name: 'modals',
  initialState: {
    authModal: false,
  },
  reducers: {
    authModalUpdateState(state, actions) {
      state.authModal = actions.payload.isOpen;
    },
  },
});

export const { authModalUpdateState } = modals.actions;

export default modals.reducer;
