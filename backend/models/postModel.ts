import { PostDTO, PostTable } from "../constants/interfaces";
import dbConnection from "../database/connection";
import { DataTypes, Model } from "sequelize";

export const Post = dbConnection.define(
  "post",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
);
async function create(newPost: PostDTO): Promise<PostTable | undefined> {
  try {
    const { name, description } = newPost;
    const post: Model = await Post.create({ name, description });
    return post.dataValues;
  } catch (error) {
    console.error(error);
  }
}

async function getOne(id: string): Promise<PostTable | undefined> {
  try {
    const post: Model | null = await Post.findByPk(id);
    if (!post) throw new Error();
    return post.dataValues;
  } catch (error) {
    console.error(error);
  }
}
async function getAll(): Promise<PostTable[] | undefined> {
  try {
    const response: Model[] = await Post.findAll();
    const posts: PostTable[] = response.map((item) => item.dataValues);
    return posts;
  } catch (error) {
    console.error(error);
  }
}
async function remove(id: string): Promise<number | undefined> {
  try {
    const post = await Post.destroy({ where: { id } });
    return post;
  } catch (error) {
    console.error(error);
  }
}
export default { Post, remove, getAll, getOne, create };
