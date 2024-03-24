import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect("mongodb+srv://chirantha:12345@cluster0.xcmczoo.mongodb.net/", {
    dbName: "demo_db",
  })
  .then(() => {
    console.log("Connected to DB Successfully");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => console.log(err));
