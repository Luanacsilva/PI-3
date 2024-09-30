import { UserEmailAlreadyInUse, UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { update_user_schema } from "@/http/schemas/user";
import { IUserRepository, UserUpdateArgs } from "@/types/user";
import bcrypt from "bcrypt";

export class UpdateUserByIdUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async (user_id: number, user_data: UserUpdateArgs) => {
        const id_validation = await id_schema.safeParseAsync(user_id);

        if (!id_validation.success) {
            throw new UserValidationDataError({
                id: id_validation.error.formErrors.formErrors
            });
        }

        const user = await this.user_repository.getById(id_validation.data);

        if (!user)
            throw new UserNotFound();

        const user_data_validation = await update_user_schema.safeParseAsync(user_data);

        if (!user_data_validation.success)
            throw new UserValidationDataError(user_data_validation.error.formErrors.fieldErrors);

        const { data } = user_data_validation;
        const update_user_args: UserUpdateArgs = {};

        if (data.id) {} // TODO ??

        if (data.name)
            update_user_args.name = data.name;

        if (data.email) {
            const user_email_in_use = await this.user_repository.getByEmail(data.email);

            if (user_email_in_use)
                throw new UserEmailAlreadyInUse();
        }

        if (data.password) {
            const salt = await bcrypt.genSalt();
            const hash_password = await bcrypt.hash(data.password, salt);

            update_user_args.password = hash_password;
        }

        if (data.type)
            update_user_args.type = data.type;
    };
}