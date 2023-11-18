const express = require("express");
const { CreateBlog, UpdateBlogImage, FindBlogList, UpdateBlog, DeleteBlog } = require("../controllers/BlogController");

const useRouter = express.Router();

useRouter.post("/create-course",CreateBlog);
useRouter.post("/update-course-image/:id",UpdateBlogImage);
useRouter.post("/find-course-list",FindBlogList);
useRouter.post("/find-course-list",FindBlogList);
useRouter.post("/update-course/:id",UpdateBlog);
useRouter.post("/delete-course/:id",DeleteBlog);


module.exports = useRouter