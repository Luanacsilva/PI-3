import { ClassValidationDataError } from "@/exceptions/class";
import { id_schema } from "@/http/schemas";
import { IClassRepository } from "@/types/class";


export class getClassSubjectsUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async (class_id: number) => {
        const class_id_validation = await id_schema.safeParseAsync(class_id);

        if (!class_id_validation.success)
            throw new ClassValidationDataError({
                class_id: class_id_validation.error.formErrors.formErrors
            });

        const subjects = await this.class_repository.getClassSubjects(class_id);

        return subjects;
    };
}