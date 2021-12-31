import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../pages/posts/PostsSlice";

export const store = configureStore({
    reducer: {posts: postsReducer},
});

export type RootState = ReturnType<typeof store.getState>;
