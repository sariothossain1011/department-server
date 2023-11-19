const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://polybd.com/wp-content/uploads/2020/09/Diploma-In-Electronics-Engineering-Books-PDF-With-Syllabus-2.png",
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