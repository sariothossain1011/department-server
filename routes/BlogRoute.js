const express = require("express");
const {
  CreateBlog,
  UpdateBlogImage,
  FindBlogList,
  UpdateBlog,
  DeleteBlog,
} = require("../controllers/BlogController");

const useRouter = express.Router();

useRouter.post("/create-blog", CreateBlog);
useRouter.get("/find-blog-list", FindBlogList);
useRouter.post("/update-course/:id", UpdateBlog);
useRouter.post("/delete-course/:id", DeleteBlog);

module.exports = useRouter;
