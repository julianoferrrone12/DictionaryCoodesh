import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        loggedIn: false,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.token = null;
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
