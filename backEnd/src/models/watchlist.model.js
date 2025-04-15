import mongoose, { Schema } from "mongoose";

const WatchlistItemSchema = new Schema(
  {
    title: { type: String, required: true },
    posterUrl: { type: String },
    rating: { type: String },
    year: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

const WatchlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [WatchlistItemSchema], // Embedded movie objects
  },
  { timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

export default Watchlist;
