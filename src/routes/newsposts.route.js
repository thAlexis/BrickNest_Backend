import express from "express";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";
import { upload } from "../config/multer.config.js";
import newsPostsController from "../controllers/newsPosts.controller.js";

const router = express.Router();

router.post(
  "/",
  jwtMiddlewares.verifyToken,
  jwtMiddlewares.verifyAdmin,
  upload.single("image"),
  newsPostsController.newPost
);

router.get("/:postid", newsPostsController.getOnePostById);

export default router;
