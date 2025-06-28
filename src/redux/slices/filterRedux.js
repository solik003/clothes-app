import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: { categories: [], color: [], size: [], sort: '' },
    reducers: {
        setFilters(state, action) {
            return { ...state, ...action.payload };
        },
    }
});

export const { setFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
