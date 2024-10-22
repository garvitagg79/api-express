import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { insertOrderSchema, insertOrderWithItemSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = Router()

router.post('/', verifyToken,validateData(insertOrderWithItemSchema), createOrder);

export default router;