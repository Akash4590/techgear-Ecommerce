import { useEffect, useState } from "react";
import { Star, Check, X, Trash2, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface AdminReview {
  _id: string;
  user: { name: string; email: string } | null;
  product: { name: string; image: string } | null;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  approved: "bg-green-50 text-green-700",
  pending: "bg-orange-50 text-orange-700",
  rejected: "bg-red-50 text-red-700",
};

const AdminReviewsPage = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/all?status=${filterStatus}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filterStatus]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      }
    } finally {
      setActionId(null);
    }
  };

  const deleteReview = async (id: string) => {
    setActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B0B14]">Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Moderate customer product reviews.</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
        >
          <option value="all">All Reviews</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white w-full max-w-full overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No reviews found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <div key={review._id} className="p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {review.product?.image && (
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#F8F9FC] flex items-center justify-center overflow-hidden">
                        <img src={review.product.image} alt="" className="h-full w-full object-contain" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0B0B14] truncate">
                        {review.product?.name || "Unknown product"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {review.user?.name} · {review.user?.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusStyles[review.status]}`}
                  >
                    {review.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-600 mb-3">{review.comment}</p>

                <div className="flex items-center gap-2">
                  {review.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(review._id, "approved")}
                      disabled={actionId === review._id}
                      className="flex items-center gap-1.5 text-xs font-medium text-green-600 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-50 transition-colors disabled:opacity-50"
                    >
                      <Check size={13} />
                      Approve
                    </button>
                  )}
                  {review.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(review._id, "rejected")}
                      disabled={actionId === review._id}
                      className="flex items-center gap-1.5 text-xs font-medium text-orange-600 border border-orange-200 rounded-lg px-3 py-1.5 hover:bg-orange-50 transition-colors disabled:opacity-50"
                    >
                      <X size={13} />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review._id)}
                    disabled={actionId === review._id}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;