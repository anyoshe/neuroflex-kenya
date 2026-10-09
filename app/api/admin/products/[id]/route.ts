import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import {
  ensureProductCatalog,
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

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteProps) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const product = validateProduct(body, id);
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
        UPDATE products
        SET category = $1,
            name = $2,
            description = $3,
            suitable_for = $4,
            image = CASE
              WHEN $5 = CONCAT('/api/products/', id, '/image') THEN image
              ELSE $5
            END,
            image_alt = $6,
            price = $7,
            active = $8,
            updated_at = NOW()
        WHERE id = $9
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
        id,
      ]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(mapProductRow(rows[0], false));
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json(
        { error: "A product with this name already exists in this category." },
        { status: 409 }
      );
    }
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Unable to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await ensureProductCatalog();
    const rows = await query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Unable to delete product" },
      { status: 500 }
    );
  }
}
