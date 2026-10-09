import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import {
  ensureProductCatalog,
  getProducts,
  mapProductRow,
  type ProductRow,
} from "@/lib/product-storage";
import { validateProduct } from "@/lib/product-validation";
import { query } from "@/lib/db";

function isAuthorized(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  return Boolean(token && verifyAdminToken(token));
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await getProducts(true);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to load admin product catalog:", error);
    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const product = validateProduct(body);
  if (!product) {
    return NextResponse.json(
      { error: "Check the product details and image, then try again." },
      { status: 400 }
    );
  }

  try {
    await ensureProductCatalog();
    const rows = await query<ProductRow>(
      `
        INSERT INTO products (
          category, name, description, suitable_for, image, image_alt, price, active
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, category, name, description, suitable_for, image, image_alt, price, active
      `,
      [
        product.category,
        product.name,
        product.description,
        product.suitableFor,
        product.image,
        product.imageAlt,
        product.price,
        product.active,
      ]
    );
    return NextResponse.json(mapProductRow(rows[0], false), { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json(
        { error: "A product with this name already exists in this category." },
        { status: 409 }
      );
    }
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: "Unable to save product" },
      { status: 500 }
    );
  }
}
