import { PostDTO, PostTable } from "../constants/interfaces";
import postModel from "../models/postModel";
async function getAll(): Promise<PostTable[] | undefined> {
  try {
    const response = await postModel.getAll();
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function create(newPost: PostDTO): Promise<PostTable | undefined> {
  try {
    const response = await postModel.create(newPost);
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function remove(id: string): Promise<PostTable | undefined> {
  try {
    const post = await postModel.getOne(id);
    const postsDeleted = await postModel.remove(id);
    if (postsDeleted !== undefined && 0 < postsDeleted) {
      return post;
    }
  } catch (error) {
    console.error(error);
  }
}
export default { create, getAll, remove };
