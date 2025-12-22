import express from "express";
import usersController from "../controllers/users.controller.js";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";

const router = express.Router();

router.delete("/", jwtMiddlewares.verifyToken, usersController.deleteAccount);

export default router;
