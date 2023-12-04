const express = require("express");
const {
  Registration,
  Login,
  FindUserData,
  FindUserList,
  UpdateUser,
  UpdateUserImage,
  DeleteUser,
  UpdateIsAdmin,
} = require("../controllers/UserController");
const { requireSignIn } = require("../middleware/Authentication");
const useRouter = express.Router();

useRouter.put("/registration", Registration);
// useRouter.get("/login", Login);
useRouter.get("/find-user", requireSignIn, FindUserData);
useRouter.get("/find-users", requireSignIn, FindUserList);
useRouter.patch("/update-user/:email", requireSignIn, UpdateUser);
useRouter.post("/update-user-image", requireSignIn, UpdateUserImage);
useRouter.delete("/delete-user/:id", requireSignIn, DeleteUser);

useRouter.put("/update-admin/:id", requireSignIn, UpdateIsAdmin);

module.exports = useRouter;
