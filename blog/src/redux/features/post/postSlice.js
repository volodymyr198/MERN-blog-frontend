import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
};

export const createPost = createAsyncThunk('post/createPost', async params => {
    try {
        const { data } = await axios.post('/posts', params);
        return data;
    } catch (error) {
        console.log(error.message);
    }
});

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/posts');
        return data;
    } catch (error) {
        console.log(error.message);
    }
});

export const removeMyPost = createAsyncThunk('post/removeMyPost', async id => {
    try {
        const { data } = await axios.delete(`/posts/${id}`, id);
        return data;
    } catch (error) {
        console.log(error.message);
    }
});

export const updateMyPost = createAsyncThunk(
    'post/updateMyPost',
    async updatedMyPost => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedMyPost}`,
                updatedMyPost
            );
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createPost.pending, state => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, state => {
                state.loading = false;
            })
            .addCase(getAllPosts.pending, state => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload?.posts;
                state.popularPosts = action.payload.popularPosts;
            })
            .addCase(getAllPosts.rejected, state => {
                state.loading = false;
            })
            .addCase(removeMyPost.pending, state => {
                state.loading = true;
            })
            .addCase(removeMyPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(
                    post => post._id !== action.payload._id
                );
            })
            .addCase(removeMyPost.rejected, state => {
                state.loading = false;
            })
            .addCase(updateMyPost.pending, state => {
                state.loading = true;
            })
            .addCase(updateMyPost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(
                    post => post._id === action.payload._id
                );
                state.posts[index] = action.payload;
            })
            .addCase(updateMyPost.rejected, state => {
                state.loading = false;
            });
    },
});

export default postSlice.reducer;
