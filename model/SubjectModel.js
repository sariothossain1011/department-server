const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubjectSchema = new mongoose.Schema(
  {
    subjectTitle: {
      type: String,
    },
    subjectDescription:{
      type: String,
    },
    subjectImage: {
        type: String,
        default:
          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
      },
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
      },
      
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const SubjectModel = mongoose.model("subject", SubjectSchema);
module.exports = SubjectModel;
