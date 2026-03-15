import { z } from "zod";

export const serviceSchema = z.object({
    title: z.string().min(1, "Provide your service title"),
    description: z.string().min(1, "Provide your service description"),
    price: z.number().min(1, "Provide your service price"),
});
