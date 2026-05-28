import { db } from "./index";
import { products, siteSettings } from "./schema";
import { sql } from "drizzle-orm";

async function seed() {
  // Run migrations inline
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      currency TEXT DEFAULT 'EUR',
      category TEXT,
      images TEXT DEFAULT '[]',
      contact_info TEXT,
      is_published INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
      updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  // Clear existing data
  await db.delete(products);
  await db.delete(siteSettings);

  // Seed products
  await db.insert(products).values([
    {
      slug: "kozena-penazenka-classic",
      name: "Kožená peňaženka Classic",
      description:
        "Ručne šitá peňaženka z prvotriednej talianskej kože. Priestor na karty, bankovky a mince. Každý kus je originál.",
      price: 89.0,
      currency: "EUR",
      category: "penazenky",
      images: ["/uploads/sample-wallet.jpg"],
      contactInfo: "info@kusok.sk",
      isPublished: true,
      sortOrder: 1,
    },
    {
      slug: "kozeny-opasok-heritage",
      name: "Kožený opasok Heritage",
      description:
        "Opasok z hrubej sedlárskej kože s mosadznou prackou. Časom získava patinu a stáva sa ešte krajším.",
      price: 65.0,
      currency: "EUR",
      category: "opasky",
      images: ["/uploads/sample-belt.jpg"],
      contactInfo: "info@kusok.sk",
      isPublished: true,
      sortOrder: 2,
    },
    {
      slug: "kozene-puzdro-na-telefon",
      name: "Kožené puzdro na telefón",
      description:
        "Minimalistické puzdro na telefón s priehradkou na karty. Ručne farbená koža, sedlársky steh.",
      price: 45.0,
      currency: "EUR",
      category: "puzdra",
      images: ["/uploads/sample-case.jpg"],
      contactInfo: "info@kusok.sk",
      isPublished: true,
      sortOrder: 3,
    },
  ]);

  // Seed site settings
  await db.insert(siteSettings).values([
    { key: "site_name", value: "kusok.sk" },
    { key: "tagline", value: "Kúsok kože, kus duše" },
    { key: "contact_email", value: "info@kusok.sk" },
  ]);

  console.log("Seed complete: 3 products and 3 site settings inserted.");
  process.exit(0);
}

seed();
