import { Router } from "express";
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { createInsertSchema } from 'drizzle-zod';
import { createProductSchema, updateProductSchema } from "../../db/productSchema.js";
import { verifySeller, verifyToken } from "../../middleware/authMiddleware.js";


const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", verifyToken, verifySeller, validateData(createProductSchema), createProduct);
router.put("/:id", verifyToken, verifySeller, validateData(updateProductSchema), updateProduct);

router.delete("/:id",verifyToken, verifySeller, deleteProduct);

export default router;
