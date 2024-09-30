import { ClassNotFound, ClassValidationDataError } from "@/exceptions/class";
import { id_schema } from "@/http/schemas";
import { IClassRepository } from "@/types/class";


export class DeleteClassByIdUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async (class_id: number) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success)
            throw new ClassValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const classe = await this.class_repository.getById(id);

        if (!classe)
            throw new ClassNotFound();

        const isDeleted = await this.class_repository.deleteById(id);

        return isDeleted;
    };
}