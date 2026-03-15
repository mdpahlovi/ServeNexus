import { Service } from "@/types";

const serverUrl = `${process.env.SERVER_URL}/api/v1/services`;

type MetaResponse = {
    page: number;
    limit: number;
    total: number;
    [key: string]: unknown;
};

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    meta?: MetaResponse;
};

export async function getServices(params: { [key: string]: string }): Promise<ApiResponse<Service[]>> {
    try {
        const query = new URLSearchParams(params).toString();
        const data = await fetch(`${serverUrl}?${query}`, {
            next: { tags: ["services"] },
            method: "GET",
        });

        return (await data.json()).data;
    } catch (error) {
        console.error("Failed to fetch services", error);
        return { success: false, message: "Failed to fetch services" };
    }
}
