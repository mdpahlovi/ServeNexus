import dotenv from "dotenv";

dotenv.config();

export const config = {
    // Server
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "5000", 10),

    // CORS
    corsOrigin: process.env.CORS_ORIGIN!,

    // Database
    databaseUrl: process.env.DATABASE_URL!,
} as const;

// Validate required environment variables
const requiredEnvVars = ["CORS_ORIGIN", "DATABASE_URL"];

export const validate = (): void => {
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }
};
