import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";
import validateResource from "../middlewares/validateResource";
import { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } from "../schemas/productSchema";

const router = Router();

// GET /api/products => Get all products (public)
router.get("/", productController.getAllProducts);

// GET /api/products/my - Get current user's products (protected)
router.get("/my", requireAuth(), productController.getMyProducts);

// GET /api/products/:id - Get single product by ID (public)
router.get("/:id", validateResource(getProductSchema), productController.getProductById);

// POST /api/products - Create new product (protected)
router.post("/", requireAuth(), validateResource(createProductSchema), productController.createProduct);

// PUT /api/products/:id - Update product (protected - owner only)
router.put("/:id", requireAuth(), validateResource(updateProductSchema), productController.updateProduct);

// DELETE /api/products/:id - Delete product (protected - owner only)
router.delete("/:id", requireAuth(), validateResource(deleteProductSchema), productController.deleteProduct);

export default router;