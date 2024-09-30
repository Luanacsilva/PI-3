import { AnnouncementNotFound, AnnouncementValidationDataError } from "@/exceptions/announcement";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { update_announcement_schema } from "@/http/schemas/announcement";
import { AnnouncementUpdateArgs, IAnnouncementRepository } from "@/types/announcement";
import { IUserRepository } from "@/types/user";

export class UpdateAnnouncementByIdUseCase {
    announcement_repository: IAnnouncementRepository;
    user_repository: IUserRepository;

    constructor(
        announcement_repository: IAnnouncementRepository,
        user_repository: IUserRepository,
    ) {
        this.announcement_repository = announcement_repository;
        this.user_repository = user_repository;
    }
    execute = async (announcement_id: number, announcement_data: AnnouncementUpdateArgs) => {
        const id_validation = await id_schema.safeParseAsync(announcement_id);

        if (!id_validation.success)
            throw new AnnouncementValidationDataError({ announcement_id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const announcement = await this.announcement_repository.getById(id);

        if (!announcement)
            throw new AnnouncementNotFound();

        const data_validation = await update_announcement_schema.safeParseAsync(announcement_data);

        if (!data_validation.success)
            throw new AnnouncementValidationDataError(data_validation.error.formErrors.fieldErrors);

        const { data } = data_validation;

        if (data.author_id) {
            const author = await this.user_repository.getById(data.author_id);

            if (!author)
                throw new UserNotFound();

            if (author.type.toString() != "Coordinator")
                throw new UserValidationDataError({
                    user: "O Usuario não é um coordenador"
                });
        }

        const updated = await this.announcement_repository.updateById(id, data);

        return updated;
    };
}