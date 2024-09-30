import { Router } from "express";
import { SubjectRepositoryPostgres } from "../repository/subject_repository";
import { SubjectController } from "../controller/subject_controller";

const router = Router();

const subject_repository = new SubjectRepositoryPostgres();
const subject_controller = new SubjectController(subject_repository);

router
    .post("/subjects", subject_controller.create)
    .get("/subjects", subject_controller.getAll)
    .get("/subjects/:subject_id", subject_controller.getById)
    .put("/subjects/:subject_id", subject_controller.updateById)
    .delete("/subjects/:subject_id", subject_controller.deleteById)

    .get("/subjects/:subject_id/classes", subject_controller.getSubjectClasses)
    .get("/subjects/:subject_id/teachers", subject_controller.getTeacherFromSubject);

export { router as subject_routes };