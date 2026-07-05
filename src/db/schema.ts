import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const templates = sqliteTable("templates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull(),
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name").notNull(),
  downloads: integer("downloads").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
