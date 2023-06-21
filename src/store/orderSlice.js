import {createSlice} from '@reduxjs/toolkit';

const order = createSlice({
    name: 'order',
    initialState: {
        data: [],
    },
    reducers: {
        setOrder(state, actions) {
            const userOrder = actions.payload.order;
            state.data = userOrder
            localStorage.setItem('order', JSON.stringify(userOrder));
        },
        updateOrder(state) {
          const storedOrder = localStorage.getItem('order');


            if (storedOrder !== undefined) {
                const parsedOrder = JSON.parse(storedOrder);
                state.data = parsedOrder
            }


        }
    },
});

export const {setOrder, updateOrder} = order.actions;

export default order.reducer;
