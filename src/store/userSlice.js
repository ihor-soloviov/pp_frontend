import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        city: null,
        name: null,
        phone: null,
        email: null,
        token: null,
        promocode40: true,
        favoritProducts: [],

    },
    reducers: {
        userLogin(state, actions) {
            state.isAuthenticated = true;
            state.name = actions.payload.name;
            state.phone = actions.payload.phone;
            state.email = actions.payload.email;
            state.token = actions.payload.token;
            state.promocode40 = actions.payload.promocode40;
            localStorage.setItem('userData', JSON.stringify(state));
        },

        userLogout(state) {
            state.isAuthenticated = false;
            state.name = null;
            state.phone = null;
            state.email = null;
            state.token = null;
            state.promocode40 = false;
            localStorage.removeItem('userData');
        },
        updateCity(state, actions) {
            state.city = actions.payload.city;
            localStorage.setItem('userData', JSON.stringify(state));
        },
        addToFavorit(state, actions) {
            const product = {
                preview: actions.payload.preview,
                name: actions.payload.name,
                price: actions.payload.price,
                count: 1,
                weight: actions.payload.weight,
                id: actions.payload.id,
                ingredients: actions.payload.ingredients,
            };

            state.favoritProducts.push(product);

            if (state.isAuthenticated) {
                localStorage.setItem(
                    'favoritProducts',
                    JSON.stringify(state.favoritProducts)
                );
            }
        },
        removeFromFavorit(state, actions) {
            const productIdToRemove = actions.payload.id;

            state.favoritProducts = state.favoritProducts.filter(
                (product) => product.id !== productIdToRemove
            );

            if (state.isAuthenticated) {
                localStorage.setItem(
                    'favoritProducts',
                    JSON.stringify(state.favoritProducts)
                );
            }
        },
        userPromocode(state) {
            state.promocode40 = false;
            localStorage.setItem('userData', JSON.stringify(state));
        },
        loadFromLocalStorage(state) {
            const favoritProducts = localStorage.getItem('favoritProducts');
            const dataParse = JSON.parse(favoritProducts);
            state.favoritProducts = dataParse;
        },
    },
});

export const {
    userLogin,
    userLogout,
    updateCity,
    addToFavorit,
    removeFromFavorit,
    loadFromLocalStorage,
    userPromocode,
} = user.actions;

export default user.reducer;
