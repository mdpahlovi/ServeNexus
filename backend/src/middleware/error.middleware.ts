import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { config } from "../config";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    let error = err;

    // Convert ZodError into an ApiError
    if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        error = new ApiError(400, "Validation failed", errors);
    }

    // Default to ApiError if not already
    if (!(error instanceof ApiError)) {
        error = new ApiError(500, err.message || "Internal Server Error");
    }

    const apiError = error as ApiError;

    console.error(`❌  ${apiError.message}`);

    res.status(apiError.statusCode).json({
        success: false,
        message: apiError.message,
        errors: apiError.errors,
        ...(config.env === "development" && { stack: apiError.stack }),
    });
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};
