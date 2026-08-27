import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Tag,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Package,
  Star,
  ImagePlus,
  Upload,
  Percent,
  Boxes,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  image: string;
  description?: string;
  stockQuantity: number; // Naya
  inStock: boolean;
  isDeal: boolean;
  discountPercent?: number;
}

const categories = ["Smartphones", "Laptops", "Audio", "Accessories", "Smartwatches"];
const dealDurationOptions = [2, 3, 5, 7, 10, 15, 30];

const emptyForm = {
  name: "",
  category: "Smartphones",
  price: "",
  imageAlt: "",
  description: "",
  stockQuantity: "", // Naya — "inStock" checkbox ki jagah
  dealEnabled: false,
  discountPercent: "",
  dealDurationDays: "5",
};

const MAX_IMAGES = 5;

const AdminProductsPage = () => {
  const { token, authFetch } = useAuth();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Image upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [dealTarget, setDealTarget] = useState<Product | null>(null);
  const [dealDiscount, setDealDiscount] = useState("");
  const [savingDeal, setSavingDeal] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setPage(1);
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch(
        `${API_BASE_URL}/products/admin/all?page=${page}&limit=10&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to load products");
        return;
      }
      setProducts(data.data);
      setTotalPages(data.pagination.totalPages || 1);
    } catch {
      setError("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchProducts();
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const resetImageState = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setExistingImage(null);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setFormError("");
    resetImageState();
    setShowFormModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      imageAlt: product.imageAlt,
      description: product.description || "",
      stockQuantity: String(product.stockQuantity ?? 0), // Naya
      dealEnabled: product.isDeal,
      discountPercent: product.discountPercent ? String(product.discountPercent) : "",
      dealDurationDays: "5",
    });
    setFormError("");
    resetImageState();
    setExistingImage(product.image);
    setShowFormModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const combined = [...selectedFiles, ...files].slice(0, MAX_IMAGES);
    setSelectedFiles(combined);
    setPreviewUrls(combined.map((file) => URL.createObjectURL(file)));

    setExistingImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeSelectedFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.price || !formData.imageAlt) {
      setFormError("Name, price, and image alt text are required.");
      return;
    }

    if (formData.stockQuantity === "" || Number(formData.stockQuantity) < 0) {
      setFormError("Please enter a valid stock quantity (0 or more).");
      return;
    }

    if (!editingProduct && selectedFiles.length === 0) {
      setFormError("Please upload at least one product image.");
      return;
    }

    if (
      formData.dealEnabled &&
      (!formData.discountPercent ||
        Number(formData.discountPercent) <= 0 ||
        Number(formData.discountPercent) >= 100)
    ) {
      setFormError("Discount percent must be between 1 and 99.");
      return;
    }

    setSaving(true);
    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("category", formData.category);
      body.append("price", formData.price);
      body.append("imageAlt", formData.imageAlt);
      body.append("description", formData.description);
      body.append("stockQuantity", formData.stockQuantity); // Naya — "inStock" ki jagah

      // Deal fields
      body.append("isDeal", String(formData.dealEnabled));
      if (formData.dealEnabled) {
        body.append("discountPercent", formData.discountPercent);
        body.append("dealDurationDays", formData.dealDurationDays);
      }

      selectedFiles.forEach((file) => {
        body.append("images", file);
      });

      const url = editingProduct
        ? `${API_BASE_URL}/products/admin/${editingProduct._id}`
        : `${API_BASE_URL}/products/admin/create`;

      const res = await authFetch(url, {
        method: editingProduct ? "PUT" : "POST",
        body,
      });
      const data = await res.json();

      if (!data.success) {
        setFormError(data.message || "Failed to save product");
        return;
      }

      setShowFormModal(false);
      resetImageState();
      fetchProducts();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/products/admin/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDeleteTarget(null);
        fetchProducts();
      }
    } finally {
      setDeleting(false);
    }
  };

  const openDealModal = (product: Product) => {
    setDealTarget(product);
    setDealDiscount(product.discountPercent ? String(product.discountPercent) : "");
  };

  const handleSetDeal = async (isDeal: boolean) => {
    if (!dealTarget) return;

    if (isDeal && (!dealDiscount || Number(dealDiscount) <= 0 || Number(dealDiscount) >= 100)) {
      return;
    }

    setSavingDeal(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/products/admin/${dealTarget._id}/deal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDeal,
          discountPercent: isDeal ? Number(dealDiscount) : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDealTarget(null);
        fetchProducts();
      }
    } finally {
      setSavingDeal(false);
    }
  };

  // Naya: total stock across current page of products
  const totalStockOnPage = products.reduce((sum, p) => sum + (p.stockQuantity || 0), 0);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B0B14]">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store's product catalog.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Naya: Total stock summary card */}
      {!loading && !error && products.length > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
            <Boxes size={18} />
          </div>
          <div>
            <p className="text-lg font-bold text-[#0B0B14] leading-tight">{totalStockOnPage.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total units in stock (this page)</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white w-full max-w-full overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <Package size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No products found.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Rating</th>
                    <th className="px-6 py-3 font-medium">Stock</th>
                    <th className="px-6 py-3 font-medium">Deal</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8F9FC] transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#F8F9FC] flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.imageAlt} className="h-full w-full object-contain" />
                          </div>
                          <span className="font-medium text-[#0B0B14] line-clamp-1">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-gray-500">{product.category}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#0B0B14]">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          {product.rating.toFixed(1)}
                          <span className="text-gray-400">({product.reviewCount})</span>
                        </div>
                      </td>
                      {/* Naya: stock quantity number ke sath badge */}
                      <td className="px-6 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {product.inStock ? `${product.stockQuantity} in stock` : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        {product.isDeal ? (
                          <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-[#4F46E5]">
                            -{product.discountPercent}%
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDealModal(product)}
                            title="Manage deal"
                            className="p-2 rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-[#4F46E5] transition-colors"
                          >
                            <Tag size={15} />
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            title="Edit product"
                            className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            title="Delete product"
                            className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-gray-50">
              {products.map((product) => (
                <div key={product._id} className="px-4 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-[#F8F9FC] flex items-center justify-center overflow-hidden">
                      <img src={product.image} alt={product.imageAlt} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#0B0B14] truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        {product.category}
                        <span className="text-gray-300">•</span>
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {product.rating.toFixed(1)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#0B0B14] whitespace-nowrap">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Naya: stock quantity mobile pe bhi */}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.inStock ? `${product.stockQuantity} in stock` : "Out of Stock"}
                      </span>
                      {product.isDeal && (
                        <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-[#4F46E5]">
                          -{product.discountPercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openDealModal(product)} className="p-1.5 rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-[#4F46E5]">
                        <Tag size={14} />
                      </button>
                      <button onClick={() => openEditModal(product)} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(product)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && !error && products.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 sm:px-6 py-3.5">
            <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full my-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#0B0B14]">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => {
                  setShowFormModal(false);
                  resetImageState();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                  />
                </div>
              </div>

              {/* Rating / reviews — read-only, driven by real customer reviews */}
              {editingProduct && (
                <div className="flex items-center gap-2 rounded-lg bg-[#F8F9FC] border border-gray-100 px-3.5 py-2.5 text-sm text-gray-500">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium text-[#0B0B14]">{editingProduct.rating.toFixed(1)}</span>
                  <span>({editingProduct.reviewCount} reviews)</span>
                  <span className="ml-auto text-xs text-gray-400">Set automatically from customer reviews</span>
                </div>
              )}

              {/* Image upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                  Product Images {!editingProduct && <span className="text-red-500">*</span>}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="grid grid-cols-4 gap-3">
                  {existingImage && (
                    <div className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-[#F8F9FC]">
                      <img src={existingImage} alt="Current" className="h-full w-full object-contain p-1.5" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] text-center py-0.5">
                        Current
                      </span>
                    </div>
                  )}

                  {previewUrls.map((url, index) => (
                    <div key={url} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-[#F8F9FC]">
                      <img src={url} alt={`Preview ${index + 1}`} className="h-full w-full object-contain p-1.5" />
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(index)}
                        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  {selectedFiles.length + (existingImage ? 1 : 0) < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <ImagePlus size={18} />
                      <span className="text-[11px] font-medium">Add Image</span>
                    </button>
                  )}
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                  <Upload size={12} />
                  PNG, JPG or WEBP — up to {MAX_IMAGES} images.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Image Alt Text</label>
                <input
                  type="text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  placeholder="e.g. iPhone 15 Pro Max in Natural Titanium"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] resize-none"
                />
              </div>

              {/* Naya: Stock Quantity — purani "In Stock" checkbox ki jagah */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                  Stock Quantity
                </label>
                <div className="relative">
                  <Boxes size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full rounded-lg border border-gray-200 pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  Product automatically shows as "Out of Stock" when this reaches 0, and reduces
                  as customers place orders.
                </p>
              </div>

              {/* ===== Deal section ===== */}
              <div className="rounded-lg border border-gray-200 p-3.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-[#0B0B14] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dealEnabled}
                    onChange={(e) =>
                      setFormData({ ...formData, dealEnabled: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]/30"
                  />
                  <Tag size={14} className="text-[#4F46E5]" />
                  Set a deal on this product
                </label>

                {formData.dealEnabled && (
                  <div className="mt-3.5 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                        Discount %
                      </label>
                      <div className="relative">
                        <Percent
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={formData.discountPercent}
                          onChange={(e) =>
                            setFormData({ ...formData, discountPercent: e.target.value })
                          }
                          placeholder="e.g. 15"
                          className="w-full rounded-lg border border-gray-200 pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                        Deal Duration
                      </label>
                      <select
                        value={formData.dealDurationDays}
                        onChange={(e) =>
                          setFormData({ ...formData, dealDurationDays: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                      >
                        {dealDurationOptions.map((d) => (
                          <option key={d} value={d}>
                            {d} days
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {formData.dealEnabled && editingProduct?.isDeal && (
                  <p className="mt-2.5 text-xs text-gray-400">
                    Saving will restart the countdown from today using the duration above.
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false);
                    resetImageState();
                  }}
                  className="flex-1 border border-gray-200 text-[#0B0B14] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={18} />
              </div>
              <button onClick={() => setDeleteTarget(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <h3 className="text-base font-bold text-[#0B0B14] mb-2">Delete this product?</h3>
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-medium text-[#0B0B14]">{deleteTarget.name}</span> will be permanently removed from your store.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-[#0B0B14] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                <Trash2 size={14} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deal Modal — quick standalone deal management, untouched */}
      {dealTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
                <Tag size={18} />
              </div>
              <button onClick={() => setDealTarget(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <h3 className="text-base font-bold text-[#0B0B14] mb-1">Manage Deal</h3>
            <p className="text-sm text-gray-500 mb-4">{dealTarget.name}</p>

            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
              Discount Percentage
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={dealDiscount}
              onChange={(e) => setDealDiscount(e.target.value)}
              placeholder="e.g. 15"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
            />

            <div className="flex gap-3">
              {dealTarget.isDeal && (
                <button
                  onClick={() => handleSetDeal(false)}
                  disabled={savingDeal}
                  className="flex-1 border border-gray-200 text-red-600 text-sm font-medium py-2.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                >
                  Remove Deal
                </button>
              )}
              <button
                onClick={() => handleSetDeal(true)}
                disabled={savingDeal}
                className="flex-1 bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-60"
              >
                {savingDeal ? "Saving..." : "Set Deal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;