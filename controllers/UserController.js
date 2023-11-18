const mongoose = require("mongoose");

const { hashPassword, comparePassword } = require("../helper/HashPassword");
// const BorrowModel = require("../../models/books/BorrowModel");
// const UserModel = require("../../models/users/UserModel");
// const {
//   CheckAssociateService,
// } = require("../../services/common/CheckAssociateService");
// const { deleteServices } = require("../../services/common/DeleteServices");
// const {
//   FindSingleItemServices,
// } = require("../../services/common/FindSingleItemServices");
const { ListServices } = require("../serveces/ListServece");
const CreateToken = require("../utility/CreateToken");
const UserModel = require("../model/UserModel");
const CloudinaryImage = require("../utility/CloudinaryImage");

exports.Registration = async (req, res) => {
  try {
    const { name, email, role, image } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const data = await new UserModel({
      name,
      email,
      image,
      role,
    }).save();
    const token = await CreateToken({ id: data._id });
    const { ...responseData } = data.toObject();

    return res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required!" });
    }
    if (!password || password.length < 6) {
      return res.json({
        status: "fail",
        message: "Password must be at least 6 characters long",
      });
    }

    const data = await UserModel.findOne({ email });
    if (!data) {
      res.status(400).json({ status: "fail", message: "User not found!" });
    }

    const passwordMatch = await comparePassword(password, data.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "Wrong password !" });
    }

    const token = await CreateToken({ id: data._id });
    const { password: removedPassword, ...responseData } = data.toObject();
    res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.FindUserData = async (req, res) => {
  try {
    const data = await UserModel.findById(req.user.id);
    if (!data) {
      return { success: "fail", message: "Not found " };
    } else {
      res.status(200).json({ success: "Success", data: data });
    }
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.FindUserList = async (req, res) => {
  const data = await ListServices(req, UserModel);
  return res.status(200).json(data);
};

exports.UpdateUser = async (req, res) => {
  try {
    const postBody = req.body;
    const email = req.params.email;
    const data = await UserModel.findByIdAndUpdate({ email }, postBody, {
      new: true,
    }).select("-password -isAdmin");
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

exports.UpdateUserImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await UserModel.findByIdAndUpdate(
      req.user.id,
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

exports.DeleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(400).send("Invalid User");

    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
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
