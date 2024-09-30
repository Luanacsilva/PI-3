import { CreateAnouncementUseCase } from "@/http/use_cases/announcemeny/create/create_announcement";
import { DeleteAnnouncementByIdUseCase } from "@/http/use_cases/announcemeny/delete/delete_announcement_by_id";
import { GetAllAnnouncementUseCase } from "@/http/use_cases/announcemeny/read/get_all_announcements";
import { GetAnnouncementByIdUseCase } from "@/http/use_cases/announcemeny/read/get_announcement_by_id";
import { UpdateAnnouncementByIdUseCase } from "@/http/use_cases/announcemeny/update/update_announcement_by_id";
import { HTTPResponseFormat } from "@/types";
import { IAnnouncementRepository } from "@/types/announcement";
import { IUserRepository } from "@/types/user";
import { NextFunction, Request, Response } from "express";

export class AnnouncementController {
    announcement_repository: IAnnouncementRepository;
    user_repository: IUserRepository;

    constructor(announcement_repository: IAnnouncementRepository, user_repository: IUserRepository) {
        this.announcement_repository = announcement_repository;
        this.user_repository = user_repository;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Anuncio criado"
        };

        const create_announcement = new CreateAnouncementUseCase(
            this.announcement_repository,
            this.user_repository
        );

        try {
            const announcement = await create_announcement.execute(req.body);

            http_response_body.data = {
                announcement: { id: announcement.id }
            };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };


    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Lista de Anuncio"
        };

        const get_all_announcements = new GetAllAnnouncementUseCase(this.announcement_repository);

        try {
            const announcements = await get_all_announcements.execute();

            http_response_body.data = { announcements };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };


    getById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Detalhes do anuncio"
        };

        const { announcement_id } = req.params;

        const get_announcement_by_id = new GetAnnouncementByIdUseCase(this.announcement_repository);

        try {
            const announcement = await get_announcement_by_id.execute(+announcement_id);

            http_response_body.data = { announcement };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };


    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Anuncio atualizado com sucesso"
        };

        const { announcement_id } = req.params;

        const update_announcement_by_id = new UpdateAnnouncementByIdUseCase(
            this.announcement_repository,
            this.user_repository
        );

        try {
            await update_announcement_by_id.execute(+announcement_id, req.body);

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };


    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Anuncio apagado com sucesso"
        };

        const { announcement_id } = req.params;

        const delete_announcement_by_id = new DeleteAnnouncementByIdUseCase(this.announcement_repository);

        try {
            await delete_announcement_by_id.execute(+announcement_id);

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };

    //  = async (req: Request, res: Response, next: NextFunction) => {}
}