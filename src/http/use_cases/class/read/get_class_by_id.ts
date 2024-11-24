import { ClassNotFound, ClassValidationDataError } from "@/exceptions/class";
import { id_schema } from "@/http/schemas";
import { IClassRepository } from "@/types/class";

export class GetClassByIdUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async (class_id: number) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success) {
            throw new ClassValidationDataError({
                class_id: id_validation.error.formErrors.formErrors
            });
        }

        const id = id_validation.data;

        const classe = await this.class_repository.getById(id);

        if (!classe)
            throw new ClassNotFound();

        return classe;
    };
}