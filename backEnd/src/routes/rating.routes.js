// routes/ratingRoutes.js
import express from "express";
import {
  rateMovie,
  getAverageRating,
} from "../controllers/rating.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"; // make sure to protect routes

const router = express.Router();

router.post("/", verifyJwt, rateMovie);
router.get("/:songTitle", getAverageRating);

export default router;
