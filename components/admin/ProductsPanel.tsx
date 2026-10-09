"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { ImagePlus, Pencil, Trash2, X } from "lucide-react";
import {
  productCategories,
  type CatalogProduct,
  type ProductCategoryId,
} from "@/lib/product-data";

type ProductForm = {
  category: ProductCategoryId;
  name: string;
  description: string;
  suitableFor: string;
  image: string;
  imageAlt: string;
  price: string;
  active: boolean;
};

const emptyForm: ProductForm = {
  category: productCategories[0].id,
  name: "",
  description: "",
  suitableFor: "",
  image: "",
  imageAlt: "",
  price: "",
  active: true,
};

async function readImageFile(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Choose a JPEG, PNG, or WebP image.");
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Images must be 2 MB or smaller.");
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Unable to read the selected image."));
    };
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

export default function ProductsPanel() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  const apiRequest = useCallback(async (path: string, init: RequestInit = {}) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("Your admin session has expired. Please sign in again.");
    }

    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result.error || "The product request could not be completed."
      );
    }
    return result;
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const data = (await apiRequest("/api/admin/products")) as CatalogProduct[];
      setProducts(data);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to load products."
      );
      setMessageIsError(true);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  useEffect(() => {
    let isCurrent = true;

    apiRequest("/api/admin/products")
      .then((data: CatalogProduct[]) => {
        if (isCurrent) setProducts(data);
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;
        setMessage(
          error instanceof Error ? error.message : "Unable to load products."
        );
        setMessageIsError(true);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [apiRequest]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  function startEditing(product: CatalogProduct) {
    setEditingId(product.id);
    setForm({
      category: product.category,
      name: product.name,
      description: product.description,
      suitableFor: product.suitableFor,
      image: product.image,
      imageAlt: product.imageAlt,
      price: product.price,
      active: product.active,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const image = await readImageFile(file);
      setForm((current) => ({
        ...current,
        image,
        imageAlt: current.imageAlt || file.name.replace(/\.[^.]+$/, ""),
      }));
      setMessage("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to use this image."
      );
      setMessageIsError(true);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await apiRequest(
        editingId
          ? `/api/admin/products/${editingId}`
          : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          body: JSON.stringify(form),
        }
      );
      const successMessage = editingId ? "Product updated." : "Product added.";
      setForm(emptyForm);
      setEditingId(null);
      setMessageIsError(false);
      setMessage(successMessage);
      await loadProducts();
    } catch (error) {
      setMessageIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Unable to save product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product: CatalogProduct) {
    if (!window.confirm(`Remove “${product.name}” from the products page?`)) {
      return;
    }

    try {
      await apiRequest(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      setMessageIsError(false);
      setMessage("Product removed.");
      if (editingId === product.id) resetForm();
      await loadProducts();
    } catch (error) {
      setMessageIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Unable to remove product."
      );
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">Manage Products</h2>
        <p className="mt-2 text-gray-600">
          Add, update, publish, or remove products shown on the public products
          page.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className={`rounded-2xl border p-4 ${
            messageIsError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm md:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {editingId ? "Edit product" : "Add a product"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <X size={16} />
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-gray-700">
            Service category
            <select
              required
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value as ProductCategoryId,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              {productCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700">
            Product name
            <input
              required
              maxLength={120}
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700 md:col-span-2">
            Description
            <textarea
              required
              maxLength={1000}
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700">
            Suitable for (optional)
            <input
              maxLength={250}
              value={form.suitableFor}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  suitableFor: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700">
            Price or price range
            <input
              required
              maxLength={80}
              placeholder="e.g. KSh 1,500"
              value={form.price}
              onChange={(event) =>
                setForm((current) => ({ ...current, price: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700 md:col-span-2">
            Product image
            <span className="block text-xs font-normal text-gray-500">
              Upload JPEG, PNG, or WebP (maximum 2 MB), or enter an existing
              site image path such as /images/products/item.webp.
            </span>
            <span className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold hover:bg-gray-50">
                <ImagePlus size={18} />
                Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => void handleImageUpload(event)}
                  className="sr-only"
                />
              </label>
              <span className="text-sm text-gray-500">or</span>
              <input
                required={!form.image}
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    image: event.target.value,
                  }))
                }
                placeholder="/images/products/item.webp"
                className="min-w-64 flex-1 rounded-xl border border-gray-300 px-4 py-3"
              />
            </span>
          </label>

          <label className="space-y-2 text-sm font-medium text-gray-700 md:col-span-2">
            Image description (alt text)
            <input
              required
              maxLength={200}
              value={form.imageAlt}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  imageAlt: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>
        </div>

        {form.image && (
          <div className="relative h-48 w-64 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={form.image}
              alt={form.imageAlt || form.name || "Product image preview"}
              fill
              unoptimized={
                form.image.startsWith("data:") || form.image.endsWith(".svg")
              }
              className="object-cover"
            />
          </div>
        )}

        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                active: event.target.checked,
              }))
            }
            className="h-4 w-4 accent-brand-green"
          />
          Show this product on the public products page
        </label>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : editingId ? "Save changes" : "Add product"}
        </button>
      </form>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Current catalog
          </h3>
          <button
            type="button"
            onClick={() => void loadProducts()}
            className="text-sm font-semibold text-brand-green hover:underline"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="rounded-2xl border bg-white p-6 text-gray-600">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="rounded-2xl border bg-white p-6 text-gray-600">
            No products have been added yet.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {products.map((product) => {
              const category = productCategories.find(
                (item) => item.id === product.category
              );

              return (
                <article
                  key={product.id}
                  className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      fill
                      unoptimized={
                        product.image.startsWith("data:") ||
                        product.image.endsWith(".svg")
                      }
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.active ? "Published" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {category?.title}
                    </p>
                    <p className="mt-1 font-semibold text-brand-green">
                      {product.price}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-gray-100"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteProduct(product)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
