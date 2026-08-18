import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    // Show all pages if there are 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 4) {
    // Beginning
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  } else if (currentPage >= totalPages - 3) {
    // End
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    // Middle
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return (
    <div className="mt-8 mb-4 flex items-center justify-center gap-2">
      {/* Previous */}
      <button type="button"
     onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-[#4F46E5]/40 hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer">
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`}
          className="flex h-9 w-7 items-center justify-center text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button key={page} type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-[#4F46E5] text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-700 hover:border-[#4F46E5]/40 hover:text-[#4F46E5]"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button type="button" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))  }
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:border-[#4F46E5]/40 hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;