import { IAnnouncementRepository } from "@/types/announcement";
import { IGradeRepository } from "@/types/grade";

export class GetAllAnnouncementUseCase {
    announcement_repository: IAnnouncementRepository;

    constructor(announcement_repository: IAnnouncementRepository) {
        this.announcement_repository = announcement_repository;
    }

    execute = async () => {
        const announcements = await this.announcement_repository.getAll();

        return announcements;
    };
}