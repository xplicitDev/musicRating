import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ReviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.plugin(mongooseAggregatePaginate);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
