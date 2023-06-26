import { Request, Response } from "express";
import {
  createPostValidation,
  postIdValidation,
} from "../validations/postValidations";
import postService from "../services/postService";
export async function getPosts(req: Request, res: Response) {
  try {
    const data = await postService.getAll();
    res.status(201);
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.json({ success: false, data: {}, error });
  }
}
export async function createPost(req: Request, res: Response) {
  try {
    await createPostValidation.validateAsync(req.body);
    const input = req.body;
    const data = await postService.create(input);
    res.status(201);
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.json({ success: false, data: {}, error });
  }
}
export async function deletePost(req: Request, res: Response) {
  try {
    await postIdValidation.validateAsync(req.params);
    const postId = req.params.id;
    const data = await postService.remove(postId);
    if (data === undefined) {
      res.status(404);
      return res.json({
        success: false,
        data: {},
        message: "Post not found",
      });
    }
    res.status(201);
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.json({ success: false, data: {}, error });
  }
}
