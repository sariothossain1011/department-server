
const VideoModel = require("../model/VideoModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");

exports.CreateVideo = async (req, res) => {
  try {
    const {link,title,description, subjectId } = req.body;
    // Check if courseId is present in req.body
    
    switch (true) {
        case !subjectId?.trim():
          return res.json({ error: "subjectId is required" });
        case !link?.trim():
          return res.json({ error: "link is required" });
        case !title?.trim():
          return res.json({ error: "title is required" });
        case !description?.trim():
          return res.json({ error: "description is required" });
      }

    const data = await new VideoModel({
        link,title,description, subjectId
    })
    await data.save();
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};


exports.FindVideoList = async (req, res) => {
  const data = await ListServices(req, VideoModel);
  return res.status(200).json(data);
};

exports.UpdateVideoImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { photo: url },
      {
        new: true,
      }
    );
    res.status(200).json({ success: "Image uploaded", data: data.photo });
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.UpdateVideo = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await VideoModel.findByIdAndUpdate(req.params.id, postBody, {
      new: true,
    });
    if (!data) {
      return res
        .status(404)
        .send({ success: "fail", message: "Update fail !" });
    }
    res.status(200).json({ success: "success", data: data });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.DeletedVideo = async (req, res) => {
  try {
    const subject = await VideoModel.findById(req.params.id);
    if (!subject) return res.status(400).send("Invalid");

    const deletedSubject = await VideoModel.findByIdAndDelete(req.params.id);
    if (deletedSubject) {
      return res
        .status(200)
        .send({ success: true, message: "User is deleted!" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "User delete fail!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
