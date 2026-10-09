import { query } from "@/lib/db";
import {
  defaultProducts,
  type CatalogProduct,
  type ProductCategoryId,
} from "@/lib/product-data";

export type ProductRow = {
  id: number;
  category: ProductCategoryId;
  name: string;
  description: string;
  suitable_for: string;
  image: string;
  image_alt: string;
  price: string;
  active: boolean;
};

let catalogReady: Promise<void> | undefined;

async function createCatalogAndSeed() {
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      suitable_for TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL DEFAULT '',
      price TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (category, name)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS product_catalog_meta (
      key TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const seedState = await query<{ key: string }>(
    "SELECT key FROM product_catalog_meta WHERE key = $1",
    ["default_products_seeded"]
  );

  if (seedState.length > 0) return;

  const values = defaultProducts.flatMap((product) => [
    product.category,
    product.name,
    product.description,
    product.suitableFor,
    product.image,
    product.imageAlt,
    product.price,
  ]);
  const placeholders = defaultProducts
    .map((_, index) => {
      const offset = index * 7;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`;
    })
    .join(", ");

  await query(
    `
      INSERT INTO products (
        category, name, description, suitable_for, image, image_alt, price
      )
      VALUES ${placeholders}
      ON CONFLICT (category, name) DO NOTHING
    `,
    values
  );
  await query(
    "INSERT INTO product_catalog_meta (key) VALUES ($1) ON CONFLICT DO NOTHING",
    ["default_products_seeded"]
  );
}

export async function ensureProductCatalog() {
  if (!catalogReady) {
    catalogReady = createCatalogAndSeed().catch((error: unknown) => {
      catalogReady = undefined;
      throw error;
    });
  }

  await catalogReady;
}

export function mapProductRow(
  row: ProductRow,
  useImageEndpoint = true
): CatalogProduct {
  const image = useImageEndpoint && row.image.startsWith("data:")
    ? `/api/products/${row.id}/image`
    : row.image;

  return {
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    suitableFor: row.suitable_for,
    image,
    imageAlt: row.image_alt,
    price: row.price,
    active: row.active,
  };
}

export async function getProducts(includeInactive = false) {
  await ensureProductCatalog();

  const rows = await query<ProductRow>(
    `
      SELECT id, category, name, description, suitable_for, image, image_alt, price, active
      FROM products
      ${includeInactive ? "" : "WHERE active = true"}
      ORDER BY category, name
    `
  );

  return rows.map((row) => mapProductRow(row, !includeInactive));
}
