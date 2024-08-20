import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        words: wordsReducer,
        user: userReducer,
    },
});

export default store