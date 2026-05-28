import { db } from "./index";
import { sql } from "drizzle-orm";

export async function runMigrations() {
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
}

runMigrations().then(() => {
  console.log("Migrations complete.");
  process.exit(0);
});
