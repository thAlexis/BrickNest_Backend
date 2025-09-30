import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

router.delete("/:id", usersController.deleteAccount);

export default router;
