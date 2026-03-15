import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { ServiceService } from "./service.service";

export class ServiceController {
    static createService = asyncHandler(async (req: Request, res: Response) => {
        const result = await ServiceService.createService(req.body);
        ApiResponse.created(res, result, "Service created successfully");
    });

    static getServices = asyncHandler(async (req: Request, res: Response) => {
        const result = await ServiceService.getServices(req.query);
        ApiResponse.paginated(res, result.data, result.meta, "Services fetched successfully");
    });

    static getService = asyncHandler(async (req: Request, res: Response) => {
        const result = await ServiceService.getService(req.params.id as string);
        ApiResponse.success(res, result, "Service fetched successfully");
    });

    static updateService = asyncHandler(async (req: Request, res: Response) => {
        const result = await ServiceService.updateService(req.params.id as string, req.body);
        ApiResponse.success(res, result, "Service updated successfully");
    });

    static deleteService = asyncHandler(async (req: Request, res: Response) => {
        const result = await ServiceService.deleteService(req.params.id as string);
        ApiResponse.success(res, result, "Service deleted successfully");
    });
}
