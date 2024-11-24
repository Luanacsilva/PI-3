import express from "express";
import cors from "cors";
import { api_routes } from "@/http/routes";
import { error_handler } from "@/middlewares/error_handler";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", api_routes);

app.use(error_handler);

export { app };