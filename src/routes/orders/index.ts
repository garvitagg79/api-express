import { Router } from "express";
import { createOrder, listOrders, getOrder, updateOrder } from "./ordersController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { insertOrderSchema, insertOrderWithItemSchema, updateOrderSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = Router()

router.post('/', verifyToken,validateData(insertOrderWithItemSchema), createOrder);

router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;