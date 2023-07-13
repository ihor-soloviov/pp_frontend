import {createSlice} from '@reduxjs/toolkit';

const order = createSlice({
    name: 'order',
    initialState: {
        paymentData: null,
        orderData: null,
        posterOrder: null,
        promocode: false,
    },
    reducers: {
        setPaymentData(state, actions) {
            state.paymentData = actions.payload.paymentData
            localStorage.setItem('user_payment_data', JSON.stringify(actions.payload.paymentData));
        },
        setOrderData(state, actions) {
            state.orderData = actions.payload.orderData
            localStorage.setItem('user_order_data', JSON.stringify(actions.payload.orderData));
        },
        setPosterResponsea(state, actions) {
            state.posterOrder = actions.payload.posterOrder
            localStorage.setItem('poster_order', JSON.stringify(actions.payload.posterOrder));
        },
        usedPromocode(state) {
            state.promocode = !state.promocode
        }

    },
});

export const {setPaymentData, setOrderData, setPosterResponsea,usedPromocode} = order.actions;

export default order.reducer;
