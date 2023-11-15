const express = require("express");
const { CreateVideo, FindVideoList, UpdateVideoImage, UpdateVideo, DeletedVideo } = require("../controllers/VideoController");


const useRouter = express.Router();


useRouter.post("/create-video",CreateVideo);
useRouter.post("/find-video-list",FindVideoList);
useRouter.post("/update-video-image/:id",UpdateVideoImage);
useRouter.post("/update-video/:id",UpdateVideo);
useRouter.post("/delete-video/:id",DeletedVideo);


module.exports = useRouter