// controllers/ratingController.js
import Rating from "../models/rating.model.js";

// POST /api/ratings - Add or update rating
export const rateMovie = async (req, res) => {
  const { movieTitle, rating } = req.body;
  const userId = req.user.id;

  try {
    let existing = await Rating.findOne({ userId, movieTitle });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: "Rating updated", rating: existing });
    }

    const newRating = new Rating({ userId, movieTitle, rating });
    await newRating.save();
    res.status(201).json({ message: "Rating added", rating: newRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to rate movie" });
  }
};

// GET /api/ratings/:movieTitle - Get average rating
export const getAverageRating = async (req, res) => {
  const { movieTitle } = req.params;

  try {
    const ratings = await Rating.find({ movieTitle });
    if (ratings.length === 0) {
      return res.json({ average: 0, count: 0 });
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / ratings.length;

    res.json({ average: avg.toFixed(1), count: ratings.length });
  } catch (error) {
    res.status(500).json({ error: "Error fetching ratings" });
  }
};
