import { ClassValidationDataError } from "@/exceptions/class";
import { create_class_schema } from "@/http/schemas/class";
import { ClassInputArgs, IClassRepository } from "@/types/class";

export class CreateClassUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async (class_data: ClassInputArgs) => {
        const data_validation = await create_class_schema.safeParseAsync(class_data);

        if (!data_validation.success) {
            const { fieldErrors } = data_validation.error.formErrors;

            throw new ClassValidationDataError(fieldErrors);
        }

        const classe = await this.class_repository.create(data_validation.data);

        return classe;
    };
}