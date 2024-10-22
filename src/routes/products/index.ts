import { Router } from "express";
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsController";
import { validateData } from "../../middleware/validationMiddleware";
import { createInsertSchema } from 'drizzle-zod';
import { createProductSchema, updateProductSchema } from "../../db/productSchema";
import { verifySeller, verifyToken } from "../../middleware/authMiddleware";


const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", verifyToken, verifySeller, validateData(createProductSchema), createProduct);
router.put("/:id", verifyToken, verifySeller, validateData(updateProductSchema), updateProduct);

router.delete("/:id",verifyToken, verifySeller, deleteProduct);

export default router;
