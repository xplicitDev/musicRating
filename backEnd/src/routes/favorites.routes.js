import express from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../controllers/favorites.controller.js";

const router = express.Router();

router.post("/add", verifyJwt, addToFavorites); // Add movie to Favourites
router.get("/", verifyJwt, getFavorites); // Get user's Favourites
router.post("/remove", verifyJwt, removeFromFavorites); // Remove movie from Favourites (POST since it sends data)

export default router;
