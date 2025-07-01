
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    sort: 'newest',
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = [];
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
});

export const {
  setLoading,
  setProducts,
  setFilteredProducts,
  setSort,
} = productsSlice.actions;

export default productsSlice.reducer;
