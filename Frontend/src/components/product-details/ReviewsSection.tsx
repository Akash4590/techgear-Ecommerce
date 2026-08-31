import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import type { Product } from "../../types/product";

interface Review {
  _id: string;
  user: { name: string } | null;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  product: Product;
  onReviewAdded?: () => void; // Naya: parent ko batao rating/reviewCount refresh ho
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ product, onReviewAdded }) => {
  const { token, isAuthenticated } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); // Naya
  const [checkingReviewStatus, setCheckingReviewStatus] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reviews list fetch karo
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/product/${product._id}`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Check karo user already review de chuka hai aur product purchase kiya hai ya nahi
  const checkReviewStatus = async () => {
    if (!isAuthenticated || !token) {
      setCheckingReviewStatus(false);
      return;
    }
    setCheckingReviewStatus(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/can-review/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setHasReviewed(data.data.hasReviewed);
        setHasPurchased(data.data.hasPurchased); // Naya
      }
    } finally {
      setCheckingReviewStatus(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    checkReviewStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product._id, token]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (rating === 0) {
      setSubmitError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setSubmitError("Please write a comment.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          rating,
          comment: comment.trim(),
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setSubmitError(data.message || "Failed to submit review");
        return;
      }

      setShowForm(false);
      setRating(0);
      setComment("");
      setHasReviewed(true);
      fetchReviews();
      onReviewAdded?.(); // parent ko refresh karne ka signal
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Summary */}
      <p className="text-sm text-gray-500 mb-6">
        This product has an average rating of{" "}
        <span className="font-semibold text-[#0B0B14]">{product.rating.toFixed(1)}</span> based on{" "}
        <span className="font-semibold text-[#0B0B14]">{product.reviewsCount}</span> reviews.
      </p>

      {/* Write a review button / form */}
      {isAuthenticated && !checkingReviewStatus && (
        <div className="mb-8">
          {hasReviewed ? (
            <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
              You've already reviewed this product. Thank you!
            </p>
          ) : !hasPurchased ? (
            // Naya: agar purchase nahi kiya, review form ki jagah ye message dikhao
            <p className="text-sm text-gray-500 bg-[#F8F9FC] border border-gray-200 rounded-lg px-4 py-2.5">
              Only customers who purchased this product can leave a review.
            </p>
          ) : showForm ? (
            <form onSubmit={handleSubmitReview} className="border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-[#0B0B14] mb-3">Write your review</p>

              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={22}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] resize-none"
              />

              {submitError && (
                <p className="mt-2 text-xs text-red-500">{submitError}</p>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-[#0B0B14] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#4F46E5] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>
      )}

      {!isAuthenticated && (
        <p className="text-sm text-gray-400 mb-8">
          Please log in to write a review.
        </p>
      )}

      {/* Reviews list */}
      {loadingReviews ? (
        <p className="text-sm text-gray-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-100 pb-5 last:border-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F9FC] text-gray-400">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0B0B14]">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1.5">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;