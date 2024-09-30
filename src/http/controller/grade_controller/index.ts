import { CreateGradeUseCase } from "@/http/use_cases/grade/create/create_grade";
import { DeleteGradeByIdUseCase } from "@/http/use_cases/grade/delete/delete_grade_by_id";
import { GetAllGradesUseCase } from "@/http/use_cases/grade/read/get_all_grades";
import { GetGradeByIdUseCase } from "@/http/use_cases/grade/read/get_grade_by_id";
import { UpdatGradeByIdUseCase } from "@/http/use_cases/grade/update/update_grade_by_id";
import { HTTPResponseFormat } from "@/types";
import { IGradeRepository } from "@/types/grade";
import { ISubjectRepository } from "@/types/subject";
import { IUserRepository } from "@/types/user";
import { Request, Response, NextFunction } from "express";

export class GradeController {
    grade_repository: IGradeRepository;
    user_repository: IUserRepository
    subject_repository: ISubjectRepository


    constructor(
        grade_repository: IGradeRepository,
        user_repository: IUserRepository,
        subject_repository: ISubjectRepository
    ) {
        this.grade_repository = grade_repository;
        this.user_repository = user_repository
        this.subject_repository = subject_repository
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Nota criada com sucesso"
        };

        const create_grade = new CreateGradeUseCase(
            this.grade_repository,
            this.user_repository,
            this.subject_repository
        );

        try {
            const grade = await create_grade.execute(req.body);

            http_response_body.data = { grade: { id: grade.id } };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    index = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Lista de Notas"
        };

        const get_all_grades = new GetAllGradesUseCase(this.grade_repository);

        try {
            const grades = await get_all_grades.execute();

            http_response_body.data = { grades };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 201,
            message: "Detalhes da Notas"
        };

        const { grade_id } = req.params;

        const get_grade_by_id = new GetGradeByIdUseCase(this.grade_repository);

        try {
            const grade = await get_grade_by_id.execute(+grade_id);

            http_response_body.data = { grade };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Nota atualizada com sucesso"
        };

        const { grade_id } = req.params;

        const update_grade_by_id = new UpdatGradeByIdUseCase(
            this.grade_repository,
            this.user_repository,
            this.subject_repository
        );

        try {
            await update_grade_by_id.execute(+grade_id, req.body);

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Nota apagada."
        };

        const { grade_id } = req.params;

        const delete_grade_by_id = new DeleteGradeByIdUseCase(this.grade_repository);

        try {
            await delete_grade_by_id.execute(+grade_id);

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    //  = async (req: Request, res: Response, next: NextFunction) => {}
}