import { ClassNotFound, ClassValidationDataError } from "@/exceptions/class";
import { id_schema } from "@/http/schemas";
import { update_class_schema } from "@/http/schemas/class";
import { ClassUpdateArgs, IClassRepository } from "@/types/class";

export class UpdateClassByIdUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async (class_id: number, class_data: ClassUpdateArgs) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success)
            throw new ClassValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const classe = await this.class_repository.getById(id)

        if(!classe)
            throw new ClassNotFound()

        const data_validation = await update_class_schema.safeParseAsync(class_data);

        if (!data_validation.success)
            throw new ClassValidationDataError(data_validation.error.formErrors.fieldErrors);

        const class_data_validated = data_validation.data;

        const updated = await this.class_repository.updateById(id, class_data_validated);

        return updated;
    };
}