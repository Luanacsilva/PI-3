import { Router } from "express";
import { GradeController } from "../controller/grade_controller";
import { GradeRepositoryPostgres } from "../repository/grade_repository";
import { UserRepositoryPostgres } from "../repository/user_repository";
import { SubjectRepositoryPostgres } from "../repository/subject_repository";

const router = Router();

const grade_controller = new GradeController(
    new GradeRepositoryPostgres(),
    new UserRepositoryPostgres(),
    new SubjectRepositoryPostgres()
);

router
    .post("/grades", grade_controller.create)
    .get("/grades", grade_controller.index)
    .get("/grades/:grade_id", grade_controller.show)
    .put("/grades/:grade_id", grade_controller.update)
    .delete("/grades/:grade_id", grade_controller.delete);

export { router as grade_routes };