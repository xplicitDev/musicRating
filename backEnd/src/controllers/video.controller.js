import Video from "../models/Video.models.js";
// import {User} from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"

// video.controller.js

const getVideoByTitle = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 5 } = req.query; // Get title, page, and limit from query params

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Fetch videos matching the title (case-insensitive partial match)
  const videos = await Video.find({ title: { $regex: title, $options: "i" } })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip((pageNumber - 1) * limitNumber) // Skip for pagination
    .limit(limitNumber); // Limit the number of results

  if (!videos || videos.length === 0) {
    throw new ApiError(404, "No videos found with this title");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Videos fetched successfully", videos));
});

// Upload Video Function
// const uploadVideo = asyncHandler(async (req, res) => {
//     // Check if video file is uploaded
//     if (!req.files || !req.files.videoFile) {
//         throw new ApiError(400, "Video file is required");
//     }

//     const videoFile = req.files.videoFile[0]; // Get uploaded video
//     const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

//     try {
//         // Upload video to Cloudinary
//         const videoUpload = await cloudinary.uploader.upload(videoFile.path, {
//             resource_type: "video",
//             folder: "videos",
//         });

//         let thumbnailUrl = null;
//         if (thumbnailFile) {
//             // Upload thumbnail to Cloudinary
//             const thumbnailUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
//                 folder: "thumbnails",
//             });
//             thumbnailUrl = thumbnailUpload.secure_url;
//         }

//         // Save video details in DB
//         const newVideo = await Video.create({
//             title: req.body.title,
//             videoUrl: videoUpload.secure_url,
//             thumbnail: thumbnailUrl,
//             description: req.body.description || "",
//         });

//         res.status(201).json(new ApiResponse(201, newVideo, "Video uploaded successfully"));
//     } catch (error) {
//         throw new ApiError(500, error.message || "Internal Server Error");
//     }
// });

// const getVideoById = asyncHandler(async (req, res) => {
//     const { videoId } = req.params;

//     if (!isValidObjectId(videoId)) {
//         throw new ApiError(400, "Invalid video ID");
//     }

//     const video = await Video.findById(videoId);
//     if (!video) {
//         throw new ApiError(404, "Video not found");
//     }

//     res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
// });

// const updateVideo = asyncHandler(async (req, res) => {
//     const { videoId } = req.params;

//     if (!isValidObjectId(videoId)) {
//         throw new ApiError(400, "Invalid video ID");
//     }

//     const video = await Video.findById(videoId);
//     if (!video) {
//         throw new ApiError(404, "Video not found");
//     }

//     // Update only provided fields
//     const updatedData = req.body;
//     Object.assign(video, updatedData);

//     await video.save();

//     res.status(200).json(new ApiResponse(200, video, "Video updated successfully"));
// });

// const deleteVideo = asyncHandler(async (req, res) => {
//     const { videoId } = req.params;

//     if (!isValidObjectId(videoId)) {
//         throw new ApiError(400, "Invalid video ID");
//     }

//     const video = await Video.findByIdAndDelete(videoId);
//     if (!video) {
//         throw new ApiError(404, "Video not found");
//     }

//     res.status(200).json(new ApiResponse(200, null, "Video deleted successfully"));
// });

// const togglePublishStatus = asyncHandler(async (req, res) => {
//     const { videoId } = req.params
// })

export {
  getVideoByTitle,
  // uploadVideo,
  // getVideoById,
  // updateVideo,
  // deleteVideo,
  // togglePublishStatus
};
