import express from "express";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";
import userCollectionController from "../controllers/userCollection.controller.js";

const router = express.Router();

router.post(
  "/addset/:setnum",
  jwtMiddlewares.verifyToken,
  userCollectionController.sendSetToCollection
);
router.get(
  "/getsetsnum",
  jwtMiddlewares.verifyToken,
  userCollectionController.getAllSetsNumInUserCollection
);
router.delete(
  "/delete/:setnum",
  jwtMiddlewares.verifyToken,
  userCollectionController.deleteSetFromCollection
);
router.get(
  "/getsets",
  jwtMiddlewares.verifyToken,
  userCollectionController.getAllSetsByUser
);

export default router;
