import Favorites from "../models/favorites.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ✅ Add a movie to the user's favourites
const addToFavorites = asyncHandler(async (req, res) => {
  const { title, posterUrl, rating, year, type } = req.body; // Expect full movie data
  const userId = req.user?._id;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  let favorites = await Favorites.findOne({ userId });

  if (!favorites) {
    // Create a new favourites if it doesn’t exist
    favorites = new Favorites({
      // Use 'Favorites' here
      userId,
      items: [{ title, posterUrl, rating, year, type }],
    });
  } else {
    // Check if song is already in favourites (by title, since no ID)
    if (favorites.items.some((item) => item.title === title)) {
      throw new ApiError(400, "Song already in favourites");
    }
    // Add new movie to existing favourites
    favorites.items.push({ title, posterUrl, rating, year, type });
  }

  await favorites.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, favorites, "Movie added to favourites successfully")
    );
});

// ✅ Get user's favourites
const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const favorites = await Favorites.findOne({ userId });

  if (!favorites) {
    return res
      .status(200)
      .json(new ApiResponse(200, { userId, items: [] }, "Favorites is empty"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, favorites, "Favorites fetched successfully"));
});

// ✅ Remove a movie from favourites
const removeFromFavorites = asyncHandler(async (req, res) => {
  const { title } = req.body; // Use title to identify movie
  const userId = req.user?._id;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const favorites = await Favorites.findOne({ userId });

  if (!favorites) {
    throw new ApiError(404, "Favorites not found");
  }

  const updatedItems = favorites.items.filter((item) => item.title !== title);

  if (updatedItems.length === favorites.items.length) {
    throw new ApiError(400, "Song not found in favourites");
  }

  favorites.items = updatedItems;
  await favorites.save();

  res
    .status(200)
    .json(new ApiResponse(200, favorites, "Song removed from favorites"));
});

export { addToFavorites, getFavorites, removeFromFavorites };
