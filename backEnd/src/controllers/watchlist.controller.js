import Watchlist from "../models/watchlist.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ✅ Add a movie to the user's watchlist
const addToWatchlist = asyncHandler(async (req, res) => {
  const { title, posterUrl, rating, year, type } = req.body; // Expect full movie data
  const userId = req.user?._id;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  let watchlist = await Watchlist.findOne({ userId });

  if (!watchlist) {
    // Create a new watchlist if it doesn’t exist
    watchlist = new Watchlist({
      userId,
      items: [{ title, posterUrl, rating, year, type }],
    });
  } else {
    // Check if movie is already in watchlist (by title, since no ID)
    if (watchlist.items.some((item) => item.title === title)) {
      throw new ApiError(400, "Movie already in watchlist");
    }
    // Add new movie to existing watchlist
    watchlist.items.push({ title, posterUrl, rating, year, type });
  }

  await watchlist.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, watchlist, "Movie added to watchlist successfully")
    );
});

// ✅ Get user's watchlist
const getWatchlist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const watchlist = await Watchlist.findOne({ userId });

  if (!watchlist) {
    return res
      .status(200)
      .json(new ApiResponse(200, { userId, items: [] }, "Watchlist is empty"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, watchlist, "Watchlist fetched successfully"));
});

// ✅ Remove a movie from watchlist
const removeFromWatchlist = asyncHandler(async (req, res) => {
  const { title } = req.body; // Use title to identify movie
  const userId = req.user?._id;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const watchlist = await Watchlist.findOne({ userId });

  if (!watchlist) {
    throw new ApiError(404, "Watchlist not found");
  }

  const updatedItems = watchlist.items.filter((item) => item.title !== title);

  if (updatedItems.length === watchlist.items.length) {
    throw new ApiError(400, "Movie not found in watchlist");
  }

  watchlist.items = updatedItems;
  await watchlist.save();

  res
    .status(200)
    .json(new ApiResponse(200, watchlist, "Movie removed from watchlist"));
});

export { addToWatchlist, getWatchlist, removeFromWatchlist };
