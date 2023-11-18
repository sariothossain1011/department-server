const CourseModel = require("../model/CourseModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");


exports.CreateCourse = async (req, res) => {
    try {

      console.log("hello",req.body)



      const { semesterName, semesterTitle  } = req.body;
      console.log("dsfsfsffffffffffffffffffffffffff")
      console.log("hello",req.body)

      if (!semesterName) {
        return res.json({ error: "Semester Name is required!" });
      }
      if (!semesterTitle) {
        return res.json({ error: "Semester Title is required!" });
      }

      const existSemesterName = await CourseModel.findOne({ semesterName: semesterName });
      if (existSemesterName) {
        return res.status(400).json({
          status: "fail",
          message: "This Semester already exist. Try another one.",
        });
      }

      const data = await new CourseModel({
        semesterName,semesterTitle
      }).save();
  
      return res.status(200).json({ status: "success", data: data });
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error.toString() });
    }
  };

  exports.FindCourseList = async (req, res) => {
    const data = await ListServices(req, CourseModel);
    return res.status(200).json(data);
  };

  exports.UpdateCourseImage = async (req, res) => {
    try {
      const url = await CloudinaryImage(req.files.photo);
  
      const data = await CourseModel.findByIdAndUpdate(
        req.params.id,
        { photo: url },
        {
          new: true,
        }
      );
      res.status(200).json({ success: "Image uploaded", imageUrl: data.photo });
    } catch (error) {
      res.status(400).json({ success: "fail", data: error.toString() });
    }
  };

  exports.UpdateCourse = async (req, res) => {
    try {
      const postBody = req.body;
      const data = await CourseModel.findByIdAndUpdate(req.params.id, postBody, {
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


  exports.DeleteCourse = async (req, res) => {
    try {
      const user = await CourseModel.findById(req.params.id);
      if (!user) return res.status(400).send("Invalid");
    
      const deletedUser = await CourseModel.findByIdAndDelete(req.params.id);
      if (deletedUser) {
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