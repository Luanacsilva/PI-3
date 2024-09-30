import { Router } from "express";
import { AnnouncementController } from "../controller/announcement_controller";
import { AnnouncementRepositoryPostgres } from "../repository/announcement_repository";
import { UserRepositoryPostgres } from "../repository/user_repository";

const router = Router();

const announcement_controller = new AnnouncementController(
    new AnnouncementRepositoryPostgres(),
    new UserRepositoryPostgres()
)

router
    .post("/announcement", announcement_controller.create)
    .get("/announcement", announcement_controller.getAll)
    .get("/announcement/:announcement_id", announcement_controller.getById)
    .put("/announcement/:announcement_id", announcement_controller.updateById)
    .delete("/announcement/:announcement_id", announcement_controller.deleteById)

export { router as announcement_routes };