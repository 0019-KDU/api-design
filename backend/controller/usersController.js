import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

//create JWT Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};
//Register User
const registerUser = async (req, res) => {
  //Grab data from request body
  const { email, password } = req.body;

  //Check if the fields are not empty
  if (!email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  //Check if email is already existing
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already taken" });
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    //Create a new user
    const user = await User.create({ email, password: hashedPassword });
    //Create a JWT token
    const token = createToken(user._id);
    //Send the response
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Login User
const loginUser = async (req, res) => {
  //Grab data from request body
  const { email, password } = req.body;

  //Check if the fields are not empty
  if (!email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  //Check if email is already existing
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect email" });
  }

  //check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid password" });
  }

  try {
    //Create a JWT token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
