const express = require("express");

const { CreateSubject, FindSubjectList, UpdateSubjectImage, UpdateSubject, DeletedSubject } = require("../controllers/SubjectController");
const useRouter = express.Router();

useRouter.post("/create-subject",CreateSubject);
useRouter.post("/find-subject-list",FindSubjectList);
useRouter.post("/update-subject-image/:id",UpdateSubjectImage);
useRouter.post("/update-subject/:id",UpdateSubject);
useRouter.post("/delete-subject/:id",DeletedSubject);

module.exports = useRouter