import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: process.env.DB,
  })
  .then(() => {
    console.log("Connected to DB Successfully");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => console.log(err));
