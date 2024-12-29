
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    favorites: [], 
    favoritesCount: 0, 
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      
      if (!product || !product._id) {
        console.error("Invalid product object:", product);
        return;
      }
      

      const existingProduct = state.products.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        state.total += product.price * product.quantity;
      } else {
        state.products.push(product);
        state.quantity += product.quantity;
        state.total += product.price * product.quantity;
      }
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      
      if (!productId) {
        console.error("Product ID is undefined");
        return;
      }

      const productToRemove = state.products.find(
        (product) => product._id === productId
      );

      if (productToRemove) {
        state.quantity -= productToRemove.quantity;
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      }

      if (state.products.length === 0) {
        state.quantity = 0;
        state.total = 0;
      }
    },

    addFavorite: (state, action) => {
      const product = action.payload;
    
      if (!product || !product._id) {
        console.error("Invalid product object:", product);
        return;
      }
    
      if (!Array.isArray(state.favorites)) {
        state.favorites = [];
      }
    
      const existingFavorite = state.favorites.find(
        (item) => item._id === product._id
      );
    
      if (existingFavorite) {
        existingFavorite.quantity += product.quantity || 1;
      } else {
        state.favorites.push({ ...product, quantity: product.quantity || 1 });
      }
      state.favoritesCount += product.quantity || 1;
    },

    removeFavorite: (state, action) => {
      const productId = action.payload;
      if (!productId) {
        console.error("Product ID is undefined");
        return;
      }

      const existingFavorite = state.favorites.find(
        (product) => product._id === productId
      );

      if (existingFavorite) {
        if (existingFavorite.favoritesCount > 1) {
          existingFavorite.quantity -= 1;
          state.favoritesCount -= 1;  
        } else {
          state.favorites = state.favorites.filter(
            (product) => product._id !== productId
          );
          state.favoritesCount -= 1;
        }
      }

      if (state.favorites.length === 0) {
        state.favoritesCount = 0;
      }

    }
  },
});

export const { addProduct, removeProduct, addFavorite, removeFavorite } = cartSlice.actions;
export default cartSlice.reducer;
