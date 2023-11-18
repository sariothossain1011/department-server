const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    semesterName: {
      type: String,
    },
    semesterTitle: {
      type: String,
    },
    lectures: {
      type: String,
    },
    students: {
      type: String,
    },
    createdDate:{
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: false, versionKey: false }
);

const CourseModel = mongoose.model("course", CourseSchema);
module.exports = CourseModel;