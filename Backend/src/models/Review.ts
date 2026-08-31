import mongoose, { Schema, Document } from "mongoose";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId; // Naya — proof ke liye kaunsa order se review aaya
  rating: number;
  comment: string;
  status: ReviewStatus; // Naya
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", // Filhal auto-approve, agar chaho manual review kar sakte ho
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;