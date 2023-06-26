import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
} from "../controllers/postController";

const router = express.Router();

router.route("/api/post").get(getPosts);
router.route("/api/post").post(createPost);
router.route("/api/post/:id").delete(deletePost);
export default router;
