import multer from "multer";

// Image Upload Storage (Do not modify this)
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/temp"); // Temporary storage
  },
  filename: function (req, file, cb) {
    cb(null, `${parseInt(Math.random() * 100)}${file.originalname}`);
  },
});
export const upload = multer({ storage: imageStorage });

// Video Upload Storage
// const videoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./Public/temp"); // Temporary storage
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// export const uploadVideoMiddleware = multer({ storage: videoStorage });
