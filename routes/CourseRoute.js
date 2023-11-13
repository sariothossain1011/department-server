const express = require("express");
const { CreateCourse, UpdateCourseImage, FindCourseList, UpdateCourse, DeleteCourse } = require("../controllers/CourseController");
const formidable =require("express-formidable");
const useRouter = express.Router();

useRouter.post("/create-course",CreateCourse);
useRouter.post("/update-course-image/:id",UpdateCourseImage);
useRouter.post("/find-course-list",FindCourseList);
useRouter.post("/find-course-list",FindCourseList);
useRouter.post("/update-course/:id",UpdateCourse);
useRouter.post("/delete-course/:id",DeleteCourse);


module.exports = useRouter