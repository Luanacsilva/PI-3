import { Router } from "express";
import { UserController } from "../controller/user_controller";
import { UserRepositoryPostgres } from "../repository/user_repository";
import { ClassRepositoryPostgres } from "../repository/class_repository";
import { SubjectRepositoryPostgres } from "../repository/subject_repository";
import { is, isAuthenticated } from "@/middlewares/auth";

const router = Router();

const user_controller = new UserController(
    new UserRepositoryPostgres(),
    new ClassRepositoryPostgres(),
    new SubjectRepositoryPostgres()
);

router
    .post("/users", user_controller.create)
    .get("/users", isAuthenticated, is(["Student", "Teacher"]), user_controller.getAll)
    .get("/users/:user_id", user_controller.getById)
    .put("/users/:user_id", user_controller.updateById)
    .delete("/users/:user_id", user_controller.deleteById)

    .post("/users/:user_id/classes/:class_id", user_controller.addStudentClass)
    .get("/users/:user_id/classes", user_controller.getStudentClass)
    .delete("/users/:user_id/classes/:class_id", user_controller.removeStudentClass)

    .get("/users/:user_id/subjects", user_controller.getTeacherSubject)
    .post("/users/:user_id/subjects/:subject_id", user_controller.addTeacherSubject)
    .delete("/users/:user_id/subjects/:subject_id", user_controller.removeTeacherSubject)

    .get("/users/:user_id/grades", user_controller.getUserGrades)
    .get("/users/:user_id/announcements", user_controller.getUserAnnouncement);

export { router as user_routes };