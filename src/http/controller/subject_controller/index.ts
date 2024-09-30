import { CreateSubjectUseCase } from "@/http/use_cases/subject/create/create_subject";
import { DeleteSubjectByIdUseCase } from "@/http/use_cases/subject/delete/delete_subject_by_id";
import { GetAllSubjectsUseCase } from "@/http/use_cases/subject/read/get_all_subjects";
import { GetSubjectByIdUseCase } from "@/http/use_cases/subject/read/get_subject_by_id";
import { getSubjectClassesUseCase } from "@/http/use_cases/subject/relations/class/read/get_subject_classes";
import { getTeacherFromSubjectUseCase } from "@/http/use_cases/subject/relations/user/read/get_teacher_from_subjects";
import { UpdateSubjectByIdUseCase } from "@/http/use_cases/subject/update/update_subject_by_id";
import { HTTPResponseFormat } from "@/types";
import { ISubjectRepository } from "@/types/subject";
import { Request, Response, NextFunction } from "express";

export class SubjectController {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Materia registrada com sucesso"
        };

        const create_subject = new CreateSubjectUseCase(this.subject_repository);

        try {
            const subject = await create_subject.execute(req.body);

            http_response_body.data = {
                subject: { id: subject.id }
            };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Materias"
        };

        const get_all_subjects = new GetAllSubjectsUseCase(this.subject_repository);

        try {
            const subjects = await get_all_subjects.execute();

            http_response_body.data = { subjects };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Detalhes da Materia"
        };

        const { subject_id } = req.params;

        const get_subject_by_id = new GetSubjectByIdUseCase(this.subject_repository);

        try {
            const subject = await get_subject_by_id.execute(+subject_id);

            http_response_body.data = { subject };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Materia atualizada com sucesso"
        };

        const { subject_id } = req.params;

        const update_subject_by_id = new UpdateSubjectByIdUseCase(this.subject_repository);

        try {
            await update_subject_by_id.execute(+subject_id, req.body);

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Materia apagada com sucesso"
        };

        const { subject_id } = req.params;

        const delete_subject_by_id = new DeleteSubjectByIdUseCase(this.subject_repository);

        try {
            await delete_subject_by_id.execute(+subject_id);
        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };

    getSubjectClasses = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Materia adicionada a classe"
        };

        const { subject_id } = req.params;

        const get_subject_classes = new getSubjectClassesUseCase(this.subject_repository);

        try {
            const classes = await get_subject_classes.execute(+subject_id);

            http_response_body.data = { classes };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    getTeacherFromSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Lista de Professores"
        };

        const { subject_id } = req.params;

        const get_teacher_from_subjects = new getTeacherFromSubjectUseCase(this.subject_repository);

        try {
            const teachers = await get_teacher_from_subjects.execute(+subject_id);

            http_response_body.data = { teachers };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };
}