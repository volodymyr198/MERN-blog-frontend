import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
};

export const createPost = createAsyncThunk('post/logout', async params => {
    try {
        const { data } = await axios.post('/posts', params);
        return data;
    } catch (error) {
        console.log(error.message);
    }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
            });;
    },
});

export default postSlice.reducer;
