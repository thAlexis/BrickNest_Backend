import express from "express";
import usersController from "../controllers/users.controller.js";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";

const router = express.Router();

router.put(
  "/updatepassword",
  jwtMiddlewares.verifyToken,
  usersController.modifyPassword
);
router.put(
  "/modifyaccount",
  jwtMiddlewares.verifyToken,
  usersController.modifyAccount
);

export default router;
