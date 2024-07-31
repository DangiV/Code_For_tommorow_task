import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carts: [],
    status: "idle",
    error: null,
    products: [],
}

// Async action to fetch product data
export const fetchProducts = createAsyncThunk("cartSlice/fetchProducts", async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        throw Error("Error fetching product data");
    }
});

// cart slice
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        removeItem: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { removeItem } = cartSlice.actions;

export default cartSlice.reducer;