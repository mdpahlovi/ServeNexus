import { Router } from "express";
import { serviceRoutes } from "./features/services/service.route";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

// Feature routes
router.use("/services", serviceRoutes);

export { router as apiRoutes };
