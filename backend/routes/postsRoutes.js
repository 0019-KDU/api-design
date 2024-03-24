import express from "express";
import Post from "../models/PostsModel.js";
import {
  addPosts,
  getPosts,
  deletePosts,
  updatePost,
} from "../controller/PostsController.js";

const router = express.Router();

//get the all posts
router.get("/", getPosts);

//create a new post
router.post("/", addPosts);

//delete the post
router.delete("/:id", deletePosts);

//update the post
router.put("/:id", updatePost);
export { router as postsRoutes };
