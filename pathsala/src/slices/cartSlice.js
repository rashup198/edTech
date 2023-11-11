import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    };

    // create slice
    const cartSlice = createSlice({
        name: "cart",
        initialState :initialState,
        reducers: {
            setTotalItems(state, value) {
                state.user = value.payload;
            },

        },
    });

    // export actions
    export const { setTotalItems} = cartSlice.actions;

    export default cartSlice.reducer;

    