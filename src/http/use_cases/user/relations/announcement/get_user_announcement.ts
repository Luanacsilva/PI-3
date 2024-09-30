import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { IUserRepository } from "@/types/user";

export class getUserAnnouncementsUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async (user_id: number) => {
        const id_validation = await id_schema.safeParseAsync(user_id);

        if (!id_validation.success) {
            throw new UserValidationDataError({
                id: id_validation.error.formErrors.formErrors
            });
        }

        const user = await this.user_repository.getById(id_validation.data);

        if (!user)
            throw new UserNotFound();

        if (user.type.toString() != "Coordinator")
            throw new UserValidationDataError({
                user: "O usuario especificado não é um coordenador"
            });

        const announcement = this.user_repository.getUserAnnouncements(id_validation.data);

        return announcement;
    };
}