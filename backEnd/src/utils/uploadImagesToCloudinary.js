import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Image from "../models/Image.model.js"; // Import Image model
import connectDB from "../db/index.js";

dotenv.config();

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcm0yakuc",
  api_key: process.env.CLOUDINARY_API_KEY || "111686871396262",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "m7aReiB0WQM674NKkeEq0i23zcg",
});

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define image folder path
const IMAGE_FOLDER = path.join(__dirname, "../../Public/img");

// Ensure the folder exists
if (!fs.existsSync(IMAGE_FOLDER)) {
  console.log("⚠️ Folder 'public/images' not found. Creating it...");
  fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
}

// ✅ Upload a single image to Cloudinary and save to MongoDB
const uploadImageToCloudinary = async (imagePath, fileName) => {
  try {
    console.log(`🚀 Uploading ${fileName} to Cloudinary...`);

    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: "images",
    });

    console.log(`✅ Successfully uploaded ${fileName}: ${result.secure_url}`);

    // Extract title from filename (remove extension)
    const title = path.parse(fileName).name;

    // Save image details to MongoDB
    const newImage = new Image({
      title,
      imageUrl: result.secure_url,
      thumbnail: result.secure_url.replace("/upload/", "/upload/w_300,h_200/"), // Generate a small thumbnail
    });

    await newImage.save();
    console.log(`📦 Saved to DB: ${title}`);

    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error);
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }
};

// ✅ Upload all images from folder, save to Cloudinary & DB
export const uploadAllImages = async () => {
  try {
    await connectDB();
    console.log("📂 Checking image folder...");
    const files = fs.readdirSync(IMAGE_FOLDER);

    // Filter for image files (e.g., .jpg, .jpeg, .png, .gif)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log("⚠️ No images found in the folder.");
      return new ApiResponse(200, "No images found.");
    }

    let uploadedImages = [];

    for (const file of imageFiles) {
      const filePath = path.join(IMAGE_FOLDER, file);
      const imageUrl = await uploadImageToCloudinary(filePath, file);
      uploadedImages.push(imageUrl);

      // 🗑️ Delete local file after upload
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted local file: ${file}`);
    }

    console.log("🎉 All images uploaded successfully!");
    return new ApiResponse(200, "Images uploaded successfully", uploadedImages);
  } catch (error) {
    console.error("❌ Error processing image uploads:", error);
    throw new ApiError(500, "Error processing image uploads");
  }
};

// ✅ Call the function to upload all images
uploadAllImages().catch((err) => console.error("❌ Upload Error:", err));
