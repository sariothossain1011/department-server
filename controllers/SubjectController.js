const SubjectModel = require("../model/SubjectModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");

exports.CreateSubject = async (req, res) => {
  try {
    const { subjectTitle, subjectDescription, courseId } = req.body;
    // Check if courseId is present in req.body
    if (!courseId) {
      return res.json({ error: "Course ID is required" });
    }
    // Check if subjectTitle and subjectDescription are present in req.fields
    if (!subjectTitle) {
      return res.json({ error: "Subject Name is required" });
    }
    if (!subjectDescription) {
      return res.json({ error: "Subject Description is required" });
    }
    const existsubjectTitle = await SubjectModel.findOne({
      subjectTitle: subjectTitle,
    });
    if (existsubjectTitle) {
      return res.status(400).json({
        status: "fail",
        message: "This subject already exist. Try another one.",
      });
    }
    const data = await new SubjectModel({
      subjectTitle,
      subjectDescription,
      courseId,
    })
    await data.save();
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};


exports.FindSubjectList = async (req, res) => {
  const data = await ListServices(req, SubjectModel);
  return res.status(200).json(data);
};

exports.UpdateSubjectImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.subjectImage);

    const data = await SubjectModel.findByIdAndUpdate(
      req.params.id,
      { subjectImage: url },
      {
        new: true,
      }
    );
    res.status(200).json({ success: "Image uploaded", data: data.subjectImage });
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.UpdateSubject = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await SubjectModel.findByIdAndUpdate(req.params.id, postBody, {
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

exports.DeletedSubject = async (req, res) => {
  try {
    const subject = await SubjectModel.findById(req.params.id);
    if (!subject) return res.status(400).send("Invalid");

    const deletedSubject = await SubjectModel.findByIdAndDelete(req.params.id);
    if (deletedSubject) {
      return res
        .status(200)
        .send({ success: true, message: "Deleted!" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Delete fail!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
