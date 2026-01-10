import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const validateResource = (schema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // Merge validated values instead of overwriting, and avoid setting properties that are getter-only (e.g., req.query)
        if (parsed.body) {
            req.body = { ...(req.body || {}), ...parsed.body };
        }

        if (parsed.query && Object.keys(parsed.query).length > 0) {
            try {
                // Prefer direct assignment when possible
                req.query = parsed.query;
            } catch (assignErr) {
                // If `req.query` is a getter-only property, mutate the object returned by it instead
                try {
                    Object.assign(req.query || {}, parsed.query);
                } catch (mutErr) {
                    console.warn("validateResource: could not attach parsed.query directly, storing as _validatedQuery", mutErr);
                    (req as any)._validatedQuery = parsed.query;
                }
            }
        }

        if (parsed.params) {
            req.params = { ...(req.params || {}), ...parsed.params };
        }

        next();
    } catch (e: any) {
        if (e instanceof ZodError) {
            return res.status(400).json(e.errors);
        }
        // Log unexpected non-Zod errors and return a more descriptive payload so the client doesn't receive an empty object
        console.error("validateResource unexpected error:", e);
        const message = e?.message ?? String(e) ?? "Bad Request";
        return res.status(400).json({ error: message });
    }
};

export default validateResource;
