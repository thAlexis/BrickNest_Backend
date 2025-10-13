import express from "express";
import legoThemesController from "../controllers/legoThemes.controller.js";

const router = express.Router();

router.get("/mainthemes", legoThemesController.getMainThemes);

export default router;
