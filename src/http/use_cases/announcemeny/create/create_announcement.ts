import { AnnouncementValidationDataError } from "@/exceptions/announcement";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { create_announcement_schema } from "@/http/schemas/announcement";
import { AnnouncementInputArgs, IAnnouncementRepository } from "@/types/announcement";
import { IUserRepository } from "@/types/user";

export class CreateAnouncementUseCase {
    announcement_repository: IAnnouncementRepository;
    user_repository: IUserRepository;

    constructor(
        announcement_repository: IAnnouncementRepository,
        user_repository: IUserRepository,
    ) {
        this.announcement_repository = announcement_repository;
        this.user_repository = user_repository;
    }

    execute = async (announcement_data: AnnouncementInputArgs) => {
        const announcement_data_validation = await create_announcement_schema.safeParseAsync(announcement_data);

        if (!announcement_data_validation.success) {
            const { fieldErrors } = announcement_data_validation.error.formErrors;

            throw new AnnouncementValidationDataError(fieldErrors);
        }

        const { data } = announcement_data_validation;

        const author_id = await this.user_repository.getById(data.author_id);

        if (!author_id)
            throw new UserNotFound();

        if (author_id.type.toString() != "Coordinator")
            throw new UserValidationDataError({
                author_id: "O Usuario não é um coordenador"
            });

            new Date()
        const announcement = await this.announcement_repository.create({
            ...data,
            creation_date: !data.creation_date ? new Date() : data.creation_date
        });

        return announcement;
    };
}