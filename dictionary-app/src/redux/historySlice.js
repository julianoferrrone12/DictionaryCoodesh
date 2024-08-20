import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
    name: 'history',
    initialState: {
        list: [],
        page: 1,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
    },
    reducers: {
        setHistory: (state, action) => {
            state.list = action.payload.results || [];
            state.page = action.payload.page || 1;
            state.totalPages = action.payload.totalPages || 0;
            state.hasNext = action.payload.hasNext || false;
            state.hasPrev = action.payload.hasPrev || false;
        },
        addHistory: (state, action) => {
            state.list = [...state.list, ...(action.payload.results || [])];
            state.page = action.payload.page || state.page;
            state.totalPages = action.payload.totalPages || state.totalPages;
            state.hasNext = action.payload.hasNext || state.hasNext;
            state.hasPrev = action.payload.hasPrev || state.hasPrev;
        }
    },
});

export const { setHistory, addHistory } = historySlice.actions;
export default historySlice.reducer;
