import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InputPost, PostModel } from "../../interfaces/interfaces";
const URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const sliceName = "posts";
export const getPosts = createAsyncThunk(
  `${sliceName}/getPosts`,
  async (): Promise<PostModel[] | undefined> => {
    try {
      const response = await axios.get(`${URL}/api/post`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const createPost = createAsyncThunk(
  `${sliceName}/createPost`,
  async (data: InputPost): Promise<PostModel | undefined> => {
    try {
      const response = await axios.post(`${URL}/api/post`, data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  `${sliceName}/deletePost`,
  async (id: string) => {
    try {
      const response = await axios.delete(`${URL}/api/post/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
