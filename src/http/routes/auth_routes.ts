import { Router } from "express";
import { AuthController } from "../controller/auth_controller";
import { UserRepositoryPostgres } from "../repository/user_repository";

const router = Router();

const auth_controller = new AuthController(new UserRepositoryPostgres());

router.post("/auth/login", auth_controller.log_in);

export { router as auth_routes };