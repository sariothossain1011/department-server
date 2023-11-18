const express = require("express");
const {  UpdateCourseImage, FindCourseList, UpdateCourse, DeleteCourse, CreateCourse } = require("../controllers/CourseController");
const formidable =require("express-formidable");
const useRouter = express.Router();

useRouter.get("/create-course",CreateCourse);
useRouter.post("/update-course-image/:id",UpdateCourseImage);
useRouter.get("/find-course-list",FindCourseList);
useRouter.post("/update-course/:id",UpdateCourse);
useRouter.post("/delete-course/:id",DeleteCourse);


module.exports = useRouter