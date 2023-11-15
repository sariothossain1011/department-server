const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
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
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false, versionKey: false }
);

const VideoModel = mongoose.model("video", VideoSchema);
module.exports = VideoModel;
