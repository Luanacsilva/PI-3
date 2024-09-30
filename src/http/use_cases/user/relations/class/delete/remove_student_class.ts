import { ClassNotFound } from "@/exceptions/class";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { IClassRepository } from "@/types/class";
import { IUserRepository } from "@/types/user";

export class removeStudentClassUseCase {
    user_repository: IUserRepository;
    class_repository: IClassRepository;

    constructor(user_repository: IUserRepository, class_repository: IClassRepository) {
        this.user_repository = user_repository;
        this.class_repository = class_repository;
    }

    execute = async (student_id: number, class_id: number) => {
        const user_id_validation = await id_schema.safeParseAsync(student_id);
        const class_id_validation = await id_schema.safeParseAsync(class_id);

        if (!user_id_validation.success)
            throw new UserValidationDataError({
                user_id: user_id_validation.error.formErrors.formErrors
            });

        if (!class_id_validation.success)
            throw new UserValidationDataError({
                class_id: class_id_validation.error.formErrors.formErrors
            });

        const student = await this.user_repository.getById(user_id_validation.data);

        if (!student)
            throw new UserNotFound();

        const classe = await this.class_repository.getById(class_id_validation.data);

        if (!classe)
            throw new ClassNotFound();

        // TODO - Verificar se já existe 
        const student_classes = await this.user_repository.getStudentClasses(user_id_validation.data);

        const in_class = student_classes.find((user_classes) => user_classes.id == classe.id);

        // TODO - Mudar o Erro
        if (!in_class)
            throw new UserValidationDataError({
                user_class: "O aluno já não está na Sala"
            });

        await this.user_repository.removeStudentClass(user_id_validation.data, class_id_validation.data);

        return true;
    };
}