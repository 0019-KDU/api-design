import mongoose from "mongoose";
import Post from "../models/PostsModel.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPosts = async (req, res) => {
  //Grab the data from the request body
  const { title, body } = req.body;

  //check the  fields are not empty
  if (!title || !body) {
    return res.status(400).json({
      error: "title and body are required",
    });
  }

  try {
    const post = await Post.create({ title, body });
    res.status(200).json({
      success: "post request successful",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deletePosts = async (req, res) => {
  //check the id of valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Icorrect ID",
    });
  }
  //check the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      error: "post not found",
    });
  }

  try {
    await post.deleteOne();
    res.status(200).json({
      success: "post was deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  // Grab the data from the request body
  const { title, body } = req.body;

  // Check if the fields are not empty
  if (!title || !body) {
    return res.status(400).json({
      error: "Title and body are required",
    });
  }

  // Check if the ID is of valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Incorrect ID",
    });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({
      success: "Post was updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, addPosts, deletePosts, updatePost };
