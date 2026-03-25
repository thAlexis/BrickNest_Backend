import express from "express";
import jwtMiddlewares from "../middlewares/jwtMiddlewares.js";
import userWishlistController from "../controllers/userWishlist.controller.js";

const router = express.Router();

router.post(
  "/addset/:setnum",
  jwtMiddlewares.verifyToken,
  userWishlistController.sendSetToWishlist
);

router.get(
  "/getsetsnum",
  jwtMiddlewares.verifyToken,
  userWishlistController.getAllSetsNumInUserWishlist
);

router.delete(
  "/delete/:setnum",
  jwtMiddlewares.verifyToken,
  userWishlistController.deleteSetFromWishlist
);

router.get(
  "/getsets",
  jwtMiddlewares.verifyToken,
  userWishlistController.getAllSetsByUser
);

router.get(
  "/getlastfive",
  jwtMiddlewares.verifyToken,
  userWishlistController.getLastFive
);

export default router;
