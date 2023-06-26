import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, deletePost } from "../services/postService";
import {
  PostModel,
  PostSliceState,
  StoreState,
} from "../../interfaces/interfaces";

const initialState: PostSliceState = {
  postsList: [],
  search: "",
  startIndex: 0,
  requestError: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    searchPost: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers(builder) {
    // GET POSTS
    builder.addCase(getPosts.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.postsList = action.payload;
    });
    // CREATE POST
    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const newPost: PostModel = action.payload;
        state.postsList = [newPost, ...state.postsList];
      }
    });
    // DELETE POST
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const id = action.payload.id;
      state.postsList = state.postsList.filter(
        (post: PostModel) => post.id !== id
      );
    });
  },
});
export const selectPostsList = (state: StoreState): PostModel[] => {
  return state.posts.postsList;
};
export const selectPostSearch = (state: StoreState): string => {
  return state.posts.search;
};
export const selectPostStartIndex = (state: StoreState): number => {
  return state.posts.startIndex;
};
export const { searchPost } = postSlice.actions;
export default postSlice.reducer;
