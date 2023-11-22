
const express = require("express");
const { CreateTeacher, FindTeacherList, UpdateTeacherImage, UpdateTeacher, DeleteTeacher, FindTeacherData } = require("../controllers/TeacherController");




const useRouter = express.Router();

useRouter.post("/create-teacher",CreateTeacher);
useRouter.get("/find-teacher-data/:id",FindTeacherData);
useRouter.put("/update-teacher-image/:id",UpdateTeacherImage);
useRouter.get("/find-teacher-list",FindTeacherList);
useRouter.put("/update-teacher/:id",UpdateTeacher);
useRouter.delete("/delete-teacher/:id",DeleteTeacher);

module.exports = useRouter;