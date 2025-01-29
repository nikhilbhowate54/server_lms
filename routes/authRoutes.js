const express = require("express");
const authController = require("../controllers/authController")
const authRouter = express.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
authRouter.route("/users").get(authController.userList);
authRouter.route("/user_update/:id").put(authController.userUpdate);
authRouter.route("/course_list").get(authController.courseList);
authRouter.route("/course_delete/:id").delete(authController.courseDelete);




module.exports = authRouter;