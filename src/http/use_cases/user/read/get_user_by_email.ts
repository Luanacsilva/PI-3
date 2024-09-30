import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { user_email_schema } from "@/http/schemas/user";
import { IUserRepository } from "@/types/user";

export class GetUserByEmailUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async (user_email: string) => {
        const user_email_validation = await user_email_schema.safeParseAsync(user_email);

        if (!user_email_validation.success)
            throw new UserValidationDataError({
                email: user_email_validation.error.formErrors.formErrors
            });

        const user = await this.user_repository.getByEmail(user_email_validation.data);

        if (!user)
            throw new UserNotFound();

        return user
    };
}