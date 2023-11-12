const express = require("express");
const { registration, login, findUserData, findUserList, updateUser, updateUserImage, deleteUser } = require("../controllers/usercontroller");
const { requireSignIn } = require("../middleware/Authentication");
const useRouter = express.Router();

useRouter.get("/registration",registration);
useRouter.get("/login",login);
useRouter.get("/find-user",requireSignIn,findUserData);
useRouter.get("/find-users",requireSignIn,findUserList);
useRouter.post("/update-user",requireSignIn,updateUser);
useRouter.post("/update-user-image",requireSignIn,updateUserImage);
useRouter.delete("/delete-user/:id",requireSignIn,deleteUser);

module.exports = useRouter