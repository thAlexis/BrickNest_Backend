import express from "express";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";
import userCollectionController from "../controllers/userCollection.controller.js";

const router = express.Router();

router.post(
  "/addset/:setnum",
  jwtMiddlewares.verifyToken,
  userCollectionController.sendSetToCollection
);

export default router;
