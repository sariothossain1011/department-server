const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true
    },
    body: {
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