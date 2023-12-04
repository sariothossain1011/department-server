const express = require("express");
const {  UpdateCourseImage, FindCourseList, UpdateCourse, CreateCourse, FindCourseData, DeleteCourse } = require("../controllers/CourseController");

const useRouter = express.Router();

useRouter.post("/create-course",CreateCourse);
useRouter.get("/find-course-data/:id",FindCourseData);
useRouter.put("/update-course-image/:id",UpdateCourseImage);
useRouter.get("/find-course-list",FindCourseList);
useRouter.patch("/update-course/:id",UpdateCourse);
useRouter.post("/delete-course/:id",DeleteCourse);

// useRouter.post("/delete-course/:id",DeleteCourse);
module.exports = useRouter