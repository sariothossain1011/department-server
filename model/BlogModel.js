const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/db8l1ulfq/image/upload/v1682591922/user-profile_tfugwz.png",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    note: {
      type: String,
    },
    createdDate:{
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: false, versionKey: false }
);

const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = BlogModel;