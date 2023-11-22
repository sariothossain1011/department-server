const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    department: {
      type: String,
    },
    mobile: {
      type: String,
    },
    facebookLink: {
        type: String,
      },
    whatsappLink: {
        type: String,
    },
    gender: {
      type: String,
    },
    designation: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const TeacherModel = mongoose.model("teacher", TeacherSchema);
module.exports = TeacherModel;
