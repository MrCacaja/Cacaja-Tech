import { GraphQLResult } from "@aws-amplify/api-graphql";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { RootState } from "../../app/store";
import { createPost } from "../../graphql/mutations";
import { listPosts } from "../../graphql/queries";
import { Post } from "../../models";

interface stateType {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: stateType = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = (await API.graphql({ query: listPosts })) as any;
  return response?.data?.listPosts?.items || [];
});

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export default PostsSlice.reducer;
