import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { IUserRepository } from "@/types/user";

export class getStudentGradesUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async (student_id: number) => {
        const id_validation = await id_schema.safeParseAsync(student_id);

        if (!id_validation.success)
            throw new UserValidationDataError({
                user_id: id_validation.error.formErrors.formErrors
            });

        const user = await this.user_repository.getById(id_validation.data);

        if (!user)
            throw new UserNotFound();

        if (user.type.toString() != "Student")
            throw new UserValidationDataError({
                user: "O usuario não é um estudante"
            });

        const user_grades = await this.user_repository.getStudentGrades(id_validation.data);

        return user_grades;
    };
}