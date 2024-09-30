import { IUserRepository } from "@/types/user";
import { Request, Response, NextFunction } from "express";
import { HTTPResponseFormat } from "@/types";
import { CreateUserUseCase } from "@/http/use_cases/user/create/create_user";
import { GetAllUsersUseCase } from "@/http/use_cases/user/read/get_all_users";
import { GetUserByIdUseCase } from "@/http/use_cases/user/read/get_user_by_id";
import { UpdateUserByIdUseCase } from "@/http/use_cases/user/update/update_user_by_id";
import { DeleteUserByIdUseCase } from "@/http/use_cases/user/delete/delete_user_by_id";
import { addStudentClassUseCase } from "@/http/use_cases/user/relations/class/create/add_student_class";
import { IClassRepository } from "@/types/class";
import { getStudentClassUseCase } from "@/http/use_cases/user/relations/class/read/get_student_classes";
import { removeStudentClassUseCase } from "@/http/use_cases/user/relations/class/delete/remove_student_class";
import { addTeacherSubjectUseCase } from "@/http/use_cases/user/relations/subject/create/add_teacher_subject";
import { ISubjectRepository } from "@/types/subject";
import { GetTeacherSubjectsUseCase } from "@/http/use_cases/user/relations/subject/read/get_teacher_subject";
import { removeTeacherSubjectUseCase } from "@/http/use_cases/user/relations/subject/delete/remove_teacher_subject";
import { getStudentGradesUseCase } from "@/http/use_cases/user/relations/grade/get_student_grades";
import { getUserAnnouncementsUseCase } from "@/http/use_cases/user/relations/announcement/get_user_announcement";

export class UserController {
    user_repository: IUserRepository;
    class_repository: IClassRepository;
    subject_repository: ISubjectRepository;

    constructor(user_repository: IUserRepository, class_repository: IClassRepository, subject_repository: ISubjectRepository) {
        this.user_repository = user_repository;
        this.class_repository = class_repository;
        this.subject_repository = subject_repository;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Usuario criado com sucesso"
        };

        const create_user = new CreateUserUseCase(this.user_repository);

        try {
            const user = await create_user.execute(req.body);

            http_response_body.data = { user: { id: user.id } };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Usuarios"
        };

        const get_all_users = new GetAllUsersUseCase(this.user_repository);

        try {
            const users = await get_all_users.execute();

            http_response_body.data = { users };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Usuarios"
        };

        const { user_id } = req.params;
        const get_user_by_id = new GetUserByIdUseCase(this.user_repository);

        try {
            const user = await get_user_by_id.execute(+user_id);

            http_response_body.data = { user };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Dados do usuario atualizado"
        };

        const { user_id } = req.params;

        const update_user_by_id = new UpdateUserByIdUseCase(this.user_repository);

        try {
            await update_user_by_id.execute(+user_id, req.body);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Usuario apagado."
        };

        const { user_id } = req.params;

        const delete_user_by_id = new DeleteUserByIdUseCase(this.user_repository);

        try {
            await delete_user_by_id.execute(+user_id);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    addStudentClass = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Sala adicionada ao usuario"
        };

        const { user_id, class_id } = req.params;

        const add_student_class = new addStudentClassUseCase(this.user_repository, this.class_repository);

        try {
            await add_student_class.execute(+user_id, +class_id);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    getStudentClass = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Salas do Usuario"
        };

        const { user_id } = req.params;

        const get_student_classes = new getStudentClassUseCase(this.user_repository);

        try {
            const classes = await get_student_classes.execute(+user_id);

            http_response_body.data = { classes };

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    removeStudentClass = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Sala removida do usuario"
        };

        const { user_id, class_id } = req.params;

        const remove_student_class = new removeStudentClassUseCase(this.user_repository, this.class_repository);

        try {
            await remove_student_class.execute(+user_id, +class_id);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    addTeacherSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Professor adicionado a materia"
        };

        const { user_id, subject_id } = req.params;

        const add_teacher_subject = new addTeacherSubjectUseCase(this.user_repository, this.subject_repository);

        try {
            await add_teacher_subject.execute(+user_id, +subject_id);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    getTeacherSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de materias do professor"
        };

        const { user_id } = req.params;

        const get_teacher_subject = new GetTeacherSubjectsUseCase(this.user_repository);

        try {
            const subjects = await get_teacher_subject.execute(+user_id);

            http_response_body.data = { subjects };

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    removeTeacherSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Materia removida do professor"
        };

        const { user_id, subject_id } = req.params;

        const remove_teacher_subject = new removeTeacherSubjectUseCase(this.user_repository, this.subject_repository);

        try {
            await remove_teacher_subject.execute(+user_id, +subject_id);

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    getUserGrades = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Notas do Estudante"
        };

        const { user_id } = req.params;

        const get_user_grades = new getStudentGradesUseCase(
            this.user_repository
        );

        try {
            const grades = await get_user_grades.execute(+user_id);

            http_response_body.data = { grades };

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };

    getUserAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Anuncios do Usuario"
        };

        const { user_id } = req.params;

        const get_user_announcement = new getUserAnnouncementsUseCase(
            this.user_repository
        );

        try {
            const announcements = await get_user_announcement.execute(+user_id);

            http_response_body.data = { announcements };

            return res.status(http_response_body.status).json(http_response_body);

        } catch (error) {
            return next(error);
        }
    };
}