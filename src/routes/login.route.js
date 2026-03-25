import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", usersController.loginUser);

export default router;
