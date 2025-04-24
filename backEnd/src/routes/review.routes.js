import express from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

// Protected routes (require authentication)
router.post("/review", verifyJwt, createReview);
router.put("/review/:reviewId", verifyJwt, updateReview);
router.delete("/review/:reviewId", verifyJwt, deleteReview);

// Public or protected route
router.get("/", getReviews);

export default router;
