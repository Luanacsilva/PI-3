import { UserEmailAlreadyInUse, UserValidationDataError } from "@/exceptions/user";
import { create_user_schema } from "@/http/schemas/user";
import { IUserRepository, UserInputArgs } from "@/types/user";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async (user_data: UserInputArgs) => {
        const user_data_validation = await create_user_schema.safeParseAsync(user_data);

        if (!user_data_validation.success)
            throw new UserValidationDataError(user_data_validation.error.formErrors.fieldErrors);

        const { data } = user_data_validation;

        const user_email_in_use = await this.user_repository.getByEmail(data.email);

        if (user_email_in_use)
            throw new UserEmailAlreadyInUse();

        const salt = await bcrypt.genSalt();
        const hash_password = await bcrypt.hash(data.password, salt);

        const user_created = await this.user_repository.create({ ...data, password: hash_password });

        return user_created;
    };
}