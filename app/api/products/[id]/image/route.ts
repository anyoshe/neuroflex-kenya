import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureProductCatalog } from "@/lib/product-storage";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await ensureProductCatalog();
    const products = await query<{ image: string }>(
      "SELECT image FROM products WHERE id = $1 AND active = true LIMIT 1",
      [id]
    );
    const image = products[0]?.image;
    const match = image?.match(
      /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/
    );

    if (!match) {
      return NextResponse.json({ error: "Product image not found" }, { status: 404 });
    }

    return new NextResponse(Buffer.from(match[2], "base64"), {
      headers: {
        "Content-Type": `image/${match[1]}`,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to load product image:", error);
    return NextResponse.json(
      { error: "Unable to load product image" },
      { status: 500 }
    );
  }
}
