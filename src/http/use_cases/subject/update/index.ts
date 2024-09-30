import { CreateSubjectUseCase } from "@/http/use_cases/subject/create/create_subject";
import { GetAllSubjectsUseCase } from "@/http/use_cases/subject/read/get_all_subjects";
import { GetSubjectByIdUseCase } from "@/http/use_cases/subject/read/get_subject_by_id";
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
            message: "Subject registrada com sucesso"
        };

        const create_class = new CreateSubjectUseCase(this.subject_repository);

        try {
            const classe = await create_class.execute(req.body);

            http_response_body.data = {
                class: { id: classe.id }
            };

        } catch (error) {
            return next(error)
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Subjects"
        };

        const get_all_classes = new GetAllSubjectsUseCase(this.subject_repository);

        try {
            const classes = await get_all_classes.execute();

            http_response_body.data = { classes };

        } catch (error) {
            return next(error)
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    getById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Detalhes da Subject"
        };

        const { class_id } = req.params;

        const get_class_by_id = new GetSubjectByIdUseCase(this.subject_repository);

        try {
            const classe = await get_class_by_id.execute(+class_id);

            http_response_body.data = { class: classe };

        } catch (error) {
            return next(error)
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Classe atualizada com sucesso"
        };

        const { class_id } = req.params;

        const update_by_id = new UpdateClassByIdUseCase(this.subject_repository);

        try {
            await update_by_id.execute(+class_id, req.body);

        } catch (error) {
           return next(error)
        }

        return res.status(http_response_body.status).json(http_response_body);
    };


    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Classe apagada com sucesso"
        };

        const { class_id } = req.params;

        const delete_class_by_id = new DeleteClassByIdUseCase(this.subject_repository);

        try {
            await delete_class_by_id.execute(+class_id);
        } catch (error) {
            return next(error)
        }

        return res.status(http_response_body.status).json(http_response_body);
    };
}