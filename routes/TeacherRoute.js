
const express = require("express");
const { CreateTeacher, FindTeacherList, UpdateTeacherImage, UpdateTeacher, DeleteTeacher, FindTeacherData, UpdateAdmin } = require("../controllers/TeacherController");
const { requireSignIn } = require("../middleware/Authentication");




const useRouter = express.Router();

useRouter.post("/create-teacher",CreateTeacher);
useRouter.get("/find-teacher-data/:id",FindTeacherData);
useRouter.put("/update-teacher-image/:id",UpdateTeacherImage);
useRouter.get("/find-teacher-list",FindTeacherList);
useRouter.put("/update-teacher/:id",UpdateTeacher);
useRouter.delete("/delete-teacher/:id",DeleteTeacher);
useRouter.put("/admin/:id", requireSignIn, UpdateAdmin);

module.exports = useRouter;