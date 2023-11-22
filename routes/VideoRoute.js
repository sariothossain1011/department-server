const express = require("express");
const { CreateVideo, FindVideoList, UpdateVideoImage, UpdateVideo, DeletedVideo, FindSubjectByVideo } = require("../controllers/VideoController");


const useRouter = express.Router();


useRouter.post("/create-video",CreateVideo);
useRouter.get("/find-video-list",FindVideoList);
useRouter.put("/update-video-image/:id",UpdateVideoImage);
useRouter.put("/update-video/:id",UpdateVideo);
useRouter.delete("/delete-video/:id",DeletedVideo);

useRouter.get("/find-subject-by-video/:id",FindSubjectByVideo);
module.exports = useRouter