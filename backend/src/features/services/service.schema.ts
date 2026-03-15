import { z } from "zod";

export const createServiceSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Provide your service title"),
        description: z.string().min(1, "Provide your service description"),
        price: z.number().min(1, "Provide your service price"),
    }),
});

export const getServiceSchema = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
        search: z.string().optional(),
    }),
});

export const updateServiceSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Provide your service title"),
        description: z.string().min(1, "Provide your service description"),
        price: z.number().min(1, "Provide your service price"),
    }),
});
