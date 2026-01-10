import type { Request, Response } from "express";
import * as queries from "../db/queries";
import * as commands from "../db/commands";
import { getAuth } from "@clerk/express";



export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const prods = await queries.getAllProducts();
        return res.status(200).json(prods);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const products = await queries.getProductsByUserId(userId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting user products:", error);
        res.status(500).json({ error: "Failed to get user products" });
    }
};



//get public product by id
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get product" });
    }

}


export const createProduct = async (req: Request, res: Response) => {
    try {        
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { title, description, imageUrl } = req.body;

        const product = await commands.createProduct({
            title,
            description,
            imageUrl,
            userId
        });

        res.status(201).json(product);

    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;

        // Check if product exists and belongs to user
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only update your own products" });
            return;
        }

        const product = await commands.updateProduct(id, req.body);

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

// Delete product (protected - owner only)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;

        // Check if product exists and belongs to user
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only delete your own products" });
            return;
        }

        await commands.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};