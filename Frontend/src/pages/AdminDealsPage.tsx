import { useEffect, useState } from "react";
import {
  AlertCircle,
  Tag,
  Clock,
  X,
  Package,
  Flame,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface DealProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
  discountPercent: number;
  dealExpiresAt?: string;
  inStock: boolean;
}
interface TimeLeft {
  label: string;
  urgent: boolean;
  unknown: boolean;
}

const getTimeLeft = (expiresAt: string | undefined): TimeLeft => {
  if (!expiresAt) {
    return { label: "No expiry set", urgent: false, unknown: true };
  }

  const diff = new Date(expiresAt).getTime() - Date.now();

  if (isNaN(diff)) {
    return { label: "No expiry set", urgent: false, unknown: true };
  }

  if (diff <= 0) {
    return { label: "Expiring soon", urgent: true, unknown: false };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days >= 1) {
    return { label: `${days}d ${hours}h left`, urgent: days < 1, unknown: false };
  }

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { label: `${hours}h ${minutes}m left`, urgent: true, unknown: false };
};

const ProductThumb = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#F8F9FC]">
        <Package size={22} className="text-gray-300" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-contain p-3"
    />
  );
};

const AdminDealsPage = () => {
  const { token, authFetch } = useAuth();

  const [deals, setDeals] = useState<DealProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removeTarget, setRemoveTarget] = useState<DealProduct | null>(null);
  const [removing, setRemoving] = useState(false);
  const [,forceTick] = useState(0);

  const fetchDeals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch(`${API_BASE_URL}/products/admin/deals`);
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to load deals");
        return;
      }
      setDeals(data.data);
    } catch {
      setError("Something went wrong while loading deals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDeals();
  }, [token]);

  
  useEffect(() => {
    const interval = setInterval(() => forceTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleRemoveDeal = async () => {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/products/admin/${removeTarget._id}/deal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeal: false }),
      });
      const data = await res.json();
      if (data.success) {
        setDeals((prev) => prev.filter((d) => d._id !== removeTarget._id));
        setRemoveTarget(null);
      }
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B0B14]">Deals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Active discounts — each deal runs for 5 days, then expires automatically.
          </p>
        </div>

        {!loading && !error && deals.length > 0 && (
          <div className="flex items-center gap-2 self-start rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-[#4F46E5] sm:self-auto">
            <Flame size={13} />
            {deals.length} active deal{deals.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-4 h-36 rounded-lg bg-gray-100" />
              <div className="mb-2 h-3.5 w-3/4 rounded bg-gray-100" />
              <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm font-medium text-[#0B0B14]">Couldn't load deals</p>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={fetchDeals}
            className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#0B0B14] hover:bg-gray-50 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && deals.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F9FC] text-gray-300">
            <Tag size={22} />
          </div>
          <p className="text-sm font-medium text-[#0B0B14]">No active deals</p>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Go to Products and set a discount on any item to feature it here.
          </p>
        </div>
      )}

      {/* DEALS GRID */}
      {!loading && !error && deals.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {deals.map((deal) => {
            const timeLeft = getTimeLeft(deal.dealExpiresAt);
            const discounted = deal.price * (1 - deal.discountPercent / 100);

            return (
              <div
                key={deal._id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-36 w-full bg-[#F8F9FC]">
                  <ProductThumb src={deal.image} alt={deal.imageAlt} />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#4F46E5] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    {Math.round(Number(deal.discountPercent))}% OFF
                  </span>

                  <button
                    onClick={() => setRemoveTarget(deal)}
                    title="Remove deal"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-500 opacity-0 shadow-sm transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-xs font-medium text-gray-400">{deal.category}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-[#0B0B14]">
                    {deal.name}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-base font-bold text-[#0B0B14]">
                      ${discounted.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${deal.price.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className={`mt-3 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                      timeLeft.unknown
                        ? "bg-[#F8F9FC] text-gray-400"
                        : timeLeft.urgent
                        ? "bg-red-50 text-red-600"
                        : "bg-[#F8F9FC] text-gray-500"
                    }`}
                  >
                    <Clock size={12} />
                    {timeLeft.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Remove Deal Confirmation Modal */}
      {removeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Tag size={18} />
              </div>
              <button onClick={() => setRemoveTarget(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <h3 className="mb-2 text-base font-bold text-[#0B0B14]">Remove this deal?</h3>
            <p className="mb-5 text-sm text-gray-500">
              <span className="font-medium text-[#0B0B14]">{removeTarget.name}</span> will
              return to its regular price immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setRemoveTarget(null)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-[#0B0B14] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveDeal}
                disabled={removing}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {removing ? "Removing..." : "Remove Deal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDealsPage;