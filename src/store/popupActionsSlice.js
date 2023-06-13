import { createSlice } from '@reduxjs/toolkit';

/* 
currentAction: addToCard,

currentAction: addToFavorit,
*/

const popupActions = createSlice({
  name: 'popupActions',
  initialState: {
    currentAction: '',
  },
  reducers: {
    setActions(state, actions) {
      state.currentAction = actions.payload.action;
    },
  },
});

export const { setActions } = popupActions.actions;

export default popupActions.reducer;
