import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        imageUrl: z.string().url("Invalid URL for Image"),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid Product ID"),
    }),
    body: z.object({
        title: z.string().min(1, "Title cannot be empty").optional(),
        description: z.string().min(1, "Description cannot be empty").optional(),
        imageUrl: z.string().url("Invalid URL for Image").optional(),
    }),
});

export const getProductSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid Product ID"),
    }),
});

export const deleteProductSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid Product ID"),
    }),
});
