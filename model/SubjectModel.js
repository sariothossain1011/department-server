const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectTitle: {
      type: String,
    },
    subjectImage: {
        type: String,
        default:
          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
      },
    videos: [
      {
        photo: {
          type: String,
          default:
            "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
        },
        link: {
          type: String,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const SubjectModel = mongoose.model("subject", SubjectSchema);
module.exports = SubjectModel;
