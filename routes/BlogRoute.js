const express = require("express");
const {
  CreateBlog,
  UpdateBlogImage,
  FindBlogList,
  UpdateBlog,
  DeleteBlog,
  FindBlogData,
  PagiBlogList,
} = require("../controllers/BlogController");

const useRouter = express.Router();

useRouter.post("/create-blog", CreateBlog);
useRouter.get("/find-blog-data/:id", FindBlogData);
useRouter.get("/find-blog-list", FindBlogList);
useRouter.put("/update-course/:id", UpdateBlog);
useRouter.delete("/delete-course/:id", DeleteBlog);


useRouter.get("/pagi-bloglist",PagiBlogList)

module.exports = useRouter;
