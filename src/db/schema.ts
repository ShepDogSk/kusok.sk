import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price"),
  currency: text("currency").default("EUR"),
  category: text("category"),
  images: text("images", { mode: "json" }).$type<string[]>().default([]),
  contactInfo: text("contact_info"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
