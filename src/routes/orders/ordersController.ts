import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { eq } from "drizzle-orm";

export async function createOrder(req: Request, res: Response) {
    try {
        const { order, items } = req.cleanBody;
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({message: 'Invalid order data'})
        }

        const [newOrder] = await db.insert(ordersTable)
            // @ts-ignore
            .values({ userId: userId }).returning();

        const orderItems = items.map((item: any) => ({
            ...item,
            orderId: newOrder.id
        }))
        
        const newOrderItems = await db.insert(ordersTable).values(orderItems).returning();

        res.status(201).json({...newOrder, items: newOrderItems})
    } catch (e) {
        res.status(400).json({ message: 'Invalid order data' });
    }    
}

export async function listOrders(req: Request, res: Response) {
    try {
        const orders = await db.select().from(ordersTable);
        res.json(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getOrder(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);

        const orderWithItems = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

        if (orderWithItems.length === 0) {
            res.status(404).json({ message: 'Order not found' });
        }

        const mergedOrder = {
            ...orderWithItems[0].orders,
            items: orderWithItems.map(oi => oi.order_items),
        }

        res.status(200).json(orderWithItems);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updatedOrder) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}