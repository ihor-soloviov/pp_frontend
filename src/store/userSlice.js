import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    city: 'Одеса',
    name: null,
    phone: null,
    email: null,
    token: null,
  },
  reducers: {
    userLogin(state, actions) {
      state.isAuthenticated = true;
      state.name = actions.payload.name;
      state.phone = actions.payload.phone;
      state.email = actions.payload.email;
      state.token = actions.payload.token;

      localStorage.setItem('userData', JSON.stringify(state));
    },

    userLogout(state) {
      state.isAuthenticated = false;
      state.name = null;
      state.phone = null;
      state.email = null;
      state.token = null;

      localStorage.removeItem('userData');
    },
    updateCity(state, actions) {
      state.city = actions.payload.city;
      localStorage.setItem('userData', JSON.stringify(state));
    },
  },
});

export const { userLogin, userLogout, updateCity } = user.actions;

export default user.reducer;
