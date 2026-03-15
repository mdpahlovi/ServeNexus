import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { ServiceController } from "./service.controller";
import { createServiceSchema, getServiceSchema, updateServiceSchema } from "./service.schema";

export const router = Router();

router.post("/", validate(createServiceSchema), ServiceController.createService);
router.get("/", validate(getServiceSchema), ServiceController.getServices);
router.get("/:id", ServiceController.getService);
router.put("/:id", validate(updateServiceSchema), ServiceController.updateService);
router.delete("/:id", ServiceController.deleteService);

export const serviceRoutes = router;
