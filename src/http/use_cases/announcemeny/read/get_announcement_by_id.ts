import { AnnouncementNotFound, AnnouncementValidationDataError } from "@/exceptions/announcement";
import { id_schema } from "@/http/schemas";
import { IAnnouncementRepository } from "@/types/announcement";

export class GetAnnouncementByIdUseCase {
    announcement_repository: IAnnouncementRepository;

    constructor(announcement_repository: IAnnouncementRepository) {
        this.announcement_repository = announcement_repository;
    }

    execute = async (class_id: number) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success) {
            throw new AnnouncementValidationDataError({
                Announcement_id: id_validation.error.formErrors.formErrors
            });
        }

        const id = id_validation.data;

        const Announcement = await this.announcement_repository.getById(id);

        if (!Announcement)
            throw new AnnouncementNotFound();

        return Announcement;
    };
}