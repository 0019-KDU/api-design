import express from "express";
import Post from "../models/PostsModel.js";
import {
  addPosts,
  getPosts,
  deletePosts,
  updatePost,
  getUserPosts,
} from "../controller/PostsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//get the all posts
router.get("/", getPosts);

//get the all posts
router.get("/user", auth, getUserPosts);

//create a new post
router.post("/", auth, addPosts);

//delete the post
router.delete("/:id", auth, deletePosts);

//update the post
router.put("/:id", auth, updatePost);
export { router as postsRoutes };
