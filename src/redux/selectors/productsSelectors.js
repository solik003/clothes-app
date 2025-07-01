
export const getProducts = (state) => state.cart.products;

export const selectError = (state) => state.products.error;

export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectLoading = (state) => state.products.loading;