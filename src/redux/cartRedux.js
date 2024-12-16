import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
      products: [],
      quantity: 0,
      total: 0,
    },
    reducers: {
      addProduct: (state, action) => {
        const product = action.payload;
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
        const productToRemove = state.products.find((product) => product._id === productId);
  
        if (productToRemove) {
          state.quantity -= productToRemove.quantity;
          state.total -= productToRemove.price * productToRemove.quantity;
          state.products = state.products.filter((product) => product._id !== productId);
        }
        if (state.products.length === 0) {
          state.quantity = 0;
          state.total = 0;
        }
      },
    },
  });
  
  export const { addProduct,removeProduct  } = cartSlice.actions;
  export default cartSlice.reducer;