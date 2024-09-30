import { NextFunction, Request, Response } from "express";
import { CreateClassUseCase } from "@/http/use_cases/class/create/create_class";
import { IClassRepository } from "@/types/class";
import { HTTPResponseFormat } from "@/types";
import { GetAllClassesUseCase } from "@/http/use_cases/class/read/get_all_classes";
import { GetClassByIdUseCase } from "@/http/use_cases/class/read/get_class_by_id";
import { UpdateClassByIdUseCase } from "@/http/use_cases/class/update/update_class_by_id";
import { DeleteClassByIdUseCase } from "@/http/use_cases/class/delete/delete_class_by_id";
import { ISubjectRepository } from "@/types/subject";
import { addClassSubjectUseCase } from "@/http/use_cases/class/relations/subject/create/add_class_subject";
import { getClassSubjectsUseCase } from "@/http/use_cases/class/relations/subject/read/get_class_subjects";
import { RemoveClassSubjectUseCase } from "@/http/use_cases/class/relations/subject/delete/remove_class_subject";
import { getStudentsFromClassUseCase } from "@/http/use_cases/class/relations/user/read/get_students_from_class";

export class ClassController {
    class_repository: IClassRepository;
    subject_repository: ISubjectRepository;

    constructor(class_repository: IClassRepository, subject_repository: ISubjectRepository) {
        this.class_repository = class_repository;
        this.subject_repository = subject_repository;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Aula registrada com sucesso"
        };

        const create_class = new CreateClassUseCase(this.class_repository);

        try {
            const classe = await create_class.execute(req.body);

            http_response_body.data = {
                class: { id: classe.id }
            };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de classes"
        };

        const get_all_classes = new GetAllClassesUseCase(this.class_repository);

        try {
            const classes = await get_all_classes.execute();

            http_response_body.data = { classes };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Detalhes da classe"
        };

        const { class_id } = req.params;

        const get_class_by_id = new GetClassByIdUseCase(this.class_repository);

        try {
            const classe = await get_class_by_id.execute(+class_id);

            http_response_body.data = { class: classe };

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Classe atualizada com sucesso"
        };

        const { class_id } = req.params;

        const update_by_id = new UpdateClassByIdUseCase(this.class_repository);

        try {
            await update_by_id.execute(+class_id, req.body);

        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Classe apagada com sucesso"
        };

        const { class_id } = req.params;

        const delete_class_by_id = new DeleteClassByIdUseCase(this.class_repository);

        try {
            await delete_class_by_id.execute(+class_id);
        } catch (error) {
            return next(error);
        }

        return res.status(http_response_body.status).json(http_response_body);
    };

    addClassSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Classe adicionada com sucesso" // TODO - Personalizar Mensagem
        };

        const { class_id, subject_id } = req.params;

        const add_class_subject = new addClassSubjectUseCase(
            this.class_repository,
            this.subject_repository
        );

        try {
            await add_class_subject.execute({
                class_id: +class_id,
                subject_id: +subject_id
            });

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    getClassSubjects = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de " // TODO - Personalizar Mensagem
        };

        const { class_id } = req.params;

        const get_class_subjects = new getClassSubjectsUseCase(this.class_repository);

        try {
            const subjects = await get_class_subjects.execute(+class_id);

            http_response_body.data = { subjects };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    removeClassSubject = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Classe apagada com sucesso" // TODO - Personalizar Mensagem
        };

        const { class_id, subject_id } = req.params;

        const remove_class_subject = new RemoveClassSubjectUseCase(
            this.class_repository,
            this.subject_repository
        );

        try {
            await remove_class_subject.execute({
                class_id: +class_id,
                subject_id: +subject_id
            });

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    getStudentsFromClass = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Usuarios" // TODO - Personalizar Mensagem
        };

        const { class_id } = req.params;

        const get_students_from_class = new getStudentsFromClassUseCase(this.class_repository);

        try {
            const students = await get_students_from_class.execute(+class_id);

            http_response_body.data = { students };
            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };
}