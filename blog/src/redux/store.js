import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlise';
import postSlice from './features/post/postSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice
    },
});
