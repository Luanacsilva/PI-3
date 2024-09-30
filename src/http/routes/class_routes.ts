import { Router } from "express";
import { ClassRepositoryPostgres } from "../repository/class_repository";
import { ClassController } from "../controller/class_controller";
import { SubjectRepositoryPostgres } from "../repository/subject_repository";

const router = Router();

const class_controller = new ClassController(
    new ClassRepositoryPostgres(),
    new SubjectRepositoryPostgres()
);

router
    .post("/classes", class_controller.create)
    .get("/classes", class_controller.getAll)
    .get("/classes/:class_id", class_controller.getById)
    .put("/classes/:class_id", class_controller.updateById)
    .delete("/classes/:class_id", class_controller.deleteById)

    .post("/classes/:class_id/subjects/:subject_id", class_controller.addClassSubject)
    .get("/classes/:class_id/subjects", class_controller.getClassSubjects)
    .delete("/classes/:class_id/subjects/:subject_id", class_controller.removeClassSubject)

    .get("/classes/:class_id/students", class_controller.getStudentsFromClass);

export { router as class_routes };