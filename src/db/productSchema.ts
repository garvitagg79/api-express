import { integer, pgTable, varchar, text, doublePrecision } from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
    description: text(),
  image:  varchar({ length: 255 }),
    price: doublePrecision().notNull()
});