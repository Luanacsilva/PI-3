import { AnnouncementNotFound, AnnouncementValidationDataError } from "@/exceptions/announcement";
import { id_schema } from "@/http/schemas";
import { IAnnouncementRepository } from "@/types/announcement";

export class DeleteAnnouncementByIdUseCase {
    announcement_repository: IAnnouncementRepository;

    constructor(announcement_repository: IAnnouncementRepository) {
        this.announcement_repository = announcement_repository;
    }

    execute = async (grade_id: number) => {
        const id_validation = await id_schema.safeParseAsync(grade_id);

        if (!id_validation.success)
            throw new AnnouncementValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const announcement = await this.announcement_repository.getById(id);

        if (!announcement)
            throw new AnnouncementNotFound();

        const isDeleted = await this.announcement_repository.deleteById(id);

        return isDeleted;
    };
}