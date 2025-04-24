import Review from "../models/review.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a new review
const createReview = asyncHandler(async (req, res) => {
  const { content, movieTitle } = req.body;
  const userId = req.user?._id;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Review content is required");
  }
  if (!movieTitle || movieTitle.trim() === "") {
    throw new ApiError(400, "Movie title is required");
  }

  const review = await Review.create({
    content: content.trim(),
    movieTitle: movieTitle.trim(),
    owner: userId,
  });

  if (!review) {
    throw new ApiError(500, "Failed to create review");
  }

  const populatedReview = await Review.findById(review._id).populate(
    "owner",
    "username avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedReview, "Review created successfully"));
});

// Update an existing review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const userId = req.user?._id;

  if (!reviewId) {
    throw new ApiError(400, "Review ID is required");
  }
  if (!content || content.trim() === "") {
    throw new ApiError(400, "Updated content is required");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this review");
  }

  review.content = content.trim();
  await review.save();

  const updatedReview = await Review.findById(review._id).populate(
    "owner",
    "username avatar"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedReview, "Review updated successfully"));
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user?._id;

  if (!reviewId) {
    throw new ApiError(400, "Review ID is required");
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this review");
  }

  await Review.findByIdAndDelete(reviewId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully"));
});

// Get paginated reviews for a movie
const getReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, movieTitle } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 },
    populate: { path: "owner", select: "username avatar" },
  };

  const aggregateQuery = Review.aggregate([
    {
      $match: movieTitle ? { movieTitle: movieTitle } : {},
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        content: 1,
        movieTitle: 1,
        createdAt: 1,
        updatedAt: 1,
        "owner.username": 1,
        "owner.avatar": 1,
      },
    },
  ]);

  const result = await Review.aggregatePaginate(aggregateQuery, options);

  if (!result) {
    throw new ApiError(500, "Failed to fetch reviews");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        reviews: result.docs,
        totalDocs: result.totalDocs,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
      "Reviews fetched successfully"
    )
  );
});

export { createReview, updateReview, deleteReview, getReviews };
