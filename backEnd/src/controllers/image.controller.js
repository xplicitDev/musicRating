import Image from "../models/Image.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getImageByTitle = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 6 } = req.query; // Get title, page, and limit from query params
  console.log("req.body:", req.body); // Log the body
  console.log("req.query:", req.query);

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Fetch images matching the title (case-insensitive partial match)
  const images = await Image.find({ title: { $regex: title, $options: "i" } })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip((pageNumber - 1) * limitNumber) // Skip for pagination
    .limit(limitNumber); // Limit the number of results

  if (!images || images.length === 0) {
    throw new ApiError(404, "No images found with this title");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Images fetched successfully", images));
});

export default getImageByTitle;
