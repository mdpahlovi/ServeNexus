"use server";

import { serviceSchema } from "@/schema";
import { Service } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const serverUrl = `${process.env.SERVER_URL}/api/v1/services`;

export type MetaResponse = {
    page: number;
    limit: number;
    total: number;
    [key: string]: unknown;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    meta?: MetaResponse;
};

export async function createOrUpdateService(e: React.SubmitEvent<HTMLFormElement>, id?: string) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const parsedData = serviceSchema.safeParse({
        title: data.title,
        description: data.description,
        price: Number(data.price),
    });

    if (!parsedData.success) {
        return {
            success: false,
            message: parsedData.error.issues.map((issue) => issue.message).join(", "),
        };
    }

    const response = await fetch(`${serverUrl}${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData.data),
    });

    if (response.ok) {
        redirect("/");
    }

    return await response.json();
}

export async function getServices(params: { [key: string]: string }): Promise<ApiResponse<Service[]>> {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${serverUrl}?${query}`, {
        next: { tags: ["services"] },
        method: "GET",
    });

    return await response.json();
}

export async function getService(id: string): Promise<ApiResponse<Service>> {
    const response = await fetch(`${serverUrl}/${id}`, {
        next: { tags: ["services"] },
        method: "GET",
    });

    return await response.json();
}

export async function deleteService(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    const response = await fetch(`${serverUrl}/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        revalidateTag("services", "fetch");
    }

    return await response.json();
}
