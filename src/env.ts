import z from "zod";
import "dotenv/config";

const env_schema = z.object({
    DATABASE_URL: z.string().url(),
    APP_PORT: z.coerce.number().positive(),
});

export const env = env_schema.parse(process.env);