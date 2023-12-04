
const TeacherModel = require("../model/TeacherModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");

exports.CreateTeacher = async (req, res) => {
      console.log("user", req.body)

  try {
    const {
      name,
      email,
      department,
      mobile,
      gender,
      designation,
      facebookLink,
   
    } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    if (!department) {
      return res.json({ error: "Department is required" });
    }
    if (!mobile) {
        return res.json({ error: "Mobile is required" });
      }
  
    
      if (!designation) {
        return res.json({ error: "Designation is required" });
      }


    const data = await new TeacherModel(req.body).save();

    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
exports.FindTeacherData = async (req, res) => {
    try {
      const data = await TeacherModel.findById(req.params.id);
      if (!data) {
        return { success: "fail", message: "Not found " };
      } else {
        res.status(200).json({ success: "Success", data: data });
      }
    } catch (error) {
      res.status(400).json({ success: "fail", data: error.toString() });
    }
  };


exports.FindTeacherList = async (req, res) => {
  const data = await ListServices(req, TeacherModel);
  return res.status(200).json(data);
};

exports.UpdateTeacherImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await TeacherModel.findByIdAndUpdate(
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

exports.UpdateTeacher = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await TeacherModel.findByIdAndUpdate(req.params.id, postBody, {
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

exports.DeleteTeacher = async (req, res) => {
  try {
    const user = await TeacherModel.findById(req.params.id);
    if (!user) return res.status(400).send("Invalid");

    const data = await TeacherModel.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).send({ success: true, message: "Deleted!" });
    } else {
      return res.status(400).send({ success: false, message: "Delete fail!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.UpdateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const role = "admin";

    const existUser = await TeacherModel.findById({ _id: id });
    if (!existUser) {
      return res.status(400).json({
        status: "fail",
        message: "Teacher does not exist",
      });
    }

    const updatedUser = await TeacherModel.findByIdAndUpdate(
      id,
      { $set: { role: role } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
