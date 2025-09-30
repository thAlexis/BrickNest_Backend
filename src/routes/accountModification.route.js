import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

router.put("/updatepassword", usersController.modifyPassword);

export default router;
