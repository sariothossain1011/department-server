const express = require("express");
const {
  Registration,
  Login,
  FindUserData,
  FindUserList,
  UpdateUser,
  UpdateUserImage,
  DeleteUser,
} = require("../controllers/UserController");
const { requireSignIn } = require("../middleware/Authentication");
const useRouter = express.Router();

useRouter.put("/registration", Registration);
// useRouter.get("/login", Login);
useRouter.get("/find-user", requireSignIn, FindUserData);
useRouter.get("/find-users", requireSignIn, FindUserList);
useRouter.patch("/update-user", requireSignIn, UpdateUser);
useRouter.post("/update-user-image", requireSignIn, UpdateUserImage);
useRouter.delete("/delete-user/:id", requireSignIn, DeleteUser);

module.exports = useRouter;
