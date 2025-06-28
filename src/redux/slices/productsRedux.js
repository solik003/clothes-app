
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    filters: { category: [], title: "" },
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
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.filteredProducts = state.products.filter((item) =>
        Object.entries(state.filters).every(([key, value]) =>
          item[key] && item[key].toLowerCase().includes(value.toLowerCase())
        )
      );
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
});

export const { setLoading, setProducts, setFilters, setError, setSort, setFilteredProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
