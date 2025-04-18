import mongoose, { Schema } from "mongoose";

const favoritesItemSchema = new Schema(
  {
    title: { type: String, required: true },
    posterUrl: { type: String },
    rating: { type: String },
    year: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

const FavoritesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [favoritesItemSchema], // Embedded song objects
  },
  { timestamps: true }
);

const Favorites = mongoose.model("Favorites", FavoritesSchema);

export default Favorites;
