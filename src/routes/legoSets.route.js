import express from "express";
import legoSetsController from "../controllers/legoSets.controller.js";

const router = express.Router();

router.get("/:maintheme", legoSetsController.allSetsByMainTheme);

export default router;
