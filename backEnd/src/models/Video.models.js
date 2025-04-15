import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true, // Store video file URL
    },
    thumbnail: {
      type: String, // Optional thumbnail URL
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // views: {
    //     type: Number,
    //     default: 0, // Not needed if view tracking isn't required
    // },
    // isPublished: {
    //     type: Boolean,
    //     default: true, // Not required if all videos are always visible
    // },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User", // Not needed since there's no vendor or user-uploaded videos
    // }
  },
  { timestamps: true } // Keeps track of when videos were added (useful for sorting)
);

VideoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", VideoSchema);
export default Video;
