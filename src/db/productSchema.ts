import { integer, pgTable, varchar, text, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
    description: text(),
  image:  varchar({ length: 255 }),
    price: doublePrecision().notNull()
});

export const createProductSchema = createInsertSchema(productTable).omit({
    id: true,
});

export const updateProductSchema = createInsertSchema(productTable).omit({
    id: true,
}).partial();