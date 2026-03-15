import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod/v4";

export const validate = <T>(schema: ZodType<T>) => {
    return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsed = (await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })) as Record<string, unknown>;

            if ("body" in parsed) req.body = parsed.body;

            next();
        } catch (error) {
            next(error);
        }
    };
};
