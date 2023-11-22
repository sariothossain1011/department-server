const express = require("express");

const { CreateSubject, FindSubjectList, UpdateSubjectImage, UpdateSubject, DeletedSubject, CourseFindBySubject } = require("../controllers/SubjectController");
const useRouter = express.Router();

useRouter.post("/create-subject",CreateSubject);
useRouter.get("/find-subject-list",FindSubjectList);
useRouter.put("/update-subject-image/:id",UpdateSubjectImage);
useRouter.put("/update-subject/:id",UpdateSubject);
useRouter.delete("/delete-subject/:id",DeletedSubject);



useRouter.get("/course-find-subject/:id",CourseFindBySubject);

module.exports = useRouter