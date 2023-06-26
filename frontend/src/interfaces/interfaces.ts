export interface InputPost {
  name?: string;
  description?: string;
}
export interface PostModel {
  id: string;
  name: string;
  description: string;
}
export interface FormVisibility {
  formHidden: boolean;
}
export interface PostSliceState {
  postsList: Array<PostModel>;
  search: string;
  startIndex: number;
  requestError: string | null;
}
export interface StoreState {
  posts: PostSliceState;
}
