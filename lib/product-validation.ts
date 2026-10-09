import { isProductCategoryId } from "@/lib/product-data";

export type ProductInput = {
  category: string;
  name: string;
  description: string;
  suitableFor: string;
  image: string;
  imageAlt: string;
  price: string;
  active: boolean;
};

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_DATA_URL_LENGTH = Math.ceil((MAX_IMAGE_BYTES * 4) / 3) + 100;

export function validateProduct(
  body: unknown,
  storedImageProductId?: number
): ProductInput | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  if (!isProductCategoryId(input.category)) return null;
  if (
    typeof input.name !== "string" ||
    typeof input.description !== "string" ||
    typeof input.suitableFor !== "string" ||
    typeof input.image !== "string" ||
    typeof input.imageAlt !== "string" ||
    typeof input.price !== "string"
  ) {
    return null;
  }
  if (input.active !== undefined && typeof input.active !== "boolean") return null;

  const product = {
    category: input.category,
    name: input.name.trim(),
    description: input.description.trim(),
    suitableFor: input.suitableFor.trim(),
    image: input.image.trim(),
    imageAlt: input.imageAlt.trim(),
    price: input.price.trim(),
    active: input.active !== false,
  };

  if (
    !product.name ||
    product.name.length > 120 ||
    !product.description ||
    product.description.length > 1000 ||
    product.suitableFor.length > 250 ||
    !product.image ||
    product.imageAlt.length > 200 ||
    !product.price ||
    product.price.length > 80
  ) {
    return null;
  }

  const isLocalImage =
    product.image.startsWith("/images/") &&
    !product.image.includes("..") &&
    product.image.length <= 500;
  const isStoredProductImage =
    storedImageProductId !== undefined &&
    product.image === `/api/products/${storedImageProductId}/image`;
  const imageDataUrlMatch = product.image.match(
    /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/
  );

  if (imageDataUrlMatch) {
    const decodedBytes = Buffer.from(imageDataUrlMatch[2], "base64").length;
    if (
      product.image.length > MAX_IMAGE_DATA_URL_LENGTH ||
      decodedBytes > MAX_IMAGE_BYTES
    ) {
      return null;
    }
  } else if (!isLocalImage && !isStoredProductImage) {
    return null;
  }

  return product;
}
