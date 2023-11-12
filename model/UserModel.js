const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    photo: {
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
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
    },
    roll: {
      type: String,
    },
    registrationNumber:{
      type:String,
    },
    department: {
      type: String,
    },
    semester: {
      type: String,
    },
    session:{
      type:String,
    },
    mobile: {
      type: String,
    },
    gender: {
      type: String,
    },
    designation:{
        type :String,
    },
    createdDate:{
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: false, versionKey: false }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;