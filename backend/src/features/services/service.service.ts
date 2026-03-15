import { ObjectId } from "mongodb";
import { z } from "zod";
import { ApiError } from "../../utils/ApiError";
import { db } from "../../utils/connect";
import { createServiceSchema, getServiceSchema, updateServiceSchema } from "./service.schema";

const COLLECTION = "services";

export class ServiceService {
    static createService = async (data: z.infer<typeof createServiceSchema>["body"]) => {
        const document = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection(COLLECTION).insertOne(document);

        return {
            _id: result.insertedId,
            ...document,
        };
    };

    static getServices = async (query: z.infer<typeof getServiceSchema>["query"]) => {
        const page = Number(query.page ?? 1);
        const limit = Number(query.limit ?? 6);
        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};

        if (query.search) {
            filter.$or = [{ title: { $regex: query.search, $options: "i" } }];
        }

        const [data, total] = await Promise.all([
            db.collection(COLLECTION).find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
            db.collection(COLLECTION).countDocuments(filter),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
            },
        };
    };

    static getService = async (id: string) => {
        if (!ObjectId.isValid(id)) {
            throw ApiError.badRequest("Invalid service ID");
        }

        const result = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

        if (!result) {
            throw ApiError.notFound("Service not found");
        }

        return result;
    };

    static updateService = async (id: string, data: z.infer<typeof updateServiceSchema>["body"]) => {
        if (!ObjectId.isValid(id)) {
            throw ApiError.badRequest("Invalid service ID");
        }

        const result = await db.collection(COLLECTION).findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...data,
                    updatedAt: new Date(),
                },
            },
            { returnDocument: "after" },
        );

        if (!result) {
            throw ApiError.notFound("Service not found");
        }

        return result;
    };

    static deleteService = async (id: string) => {
        if (!ObjectId.isValid(id)) {
            throw ApiError.badRequest("Invalid service ID");
        }

        const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

        if (!result.deletedCount) {
            throw ApiError.notFound("Service not found");
        }

        return { deleted: result.deletedCount === 1 };
    };
}
