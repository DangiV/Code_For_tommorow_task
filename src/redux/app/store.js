import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";

// create store 

export const store = configureStore({
    reducer: {
        allCart: cartSlice
    }
})