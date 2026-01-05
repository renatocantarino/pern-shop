import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const validateResource = (schema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        req.body = parsed.body;
        req.query = parsed.query;
        req.params = parsed.params;

        next();
    } catch (e: any) {
        if (e instanceof ZodError) {
            return res.status(400).json(e.errors);
        }
        return res.status(400).json(e);
    }
};

export default validateResource;
