import { doublePrecision, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./usersSchema.js";
import { productTable } from "./productSchema.js";
import { createInsertSchema } from "drizzle-zod";
import {z} from "zod"

export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp().notNull().defaultNow(),
    status: varchar({ length: 50 }).notNull().default('New'),
    userId: integer().references(() => userTable.id).notNull(),
})

export const orderItemsTable = pgTable('order_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer().references(() => ordersTable.id).notNull(),
    productId: integer().references(() => productTable.id).notNull(),
    quantity: integer().notNull(),
    price: doublePrecision().notNull(),
})

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
    id: true,
    userId: true,
    status: true,
    createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
    id: true,
    orderId: true,
})

export const insertOrderWithItemSchema = z.object({
    order: createInsertSchema(ordersTable),
    items: z.array(insertOrderItemSchema),
})

