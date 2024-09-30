import { SubjectNotFound, SubjectValidationDataError } from "@/exceptions/subject";
import { id_schema } from "@/http/schemas";
import { update_subject_schema } from "@/http/schemas/subject";
import { ISubjectRepository, SubjectUpdateArgs } from "@/types/subject";

export class UpdateSubjectByIdUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (subject_id: number, class_data: SubjectUpdateArgs) => {
        const id_validation = await id_schema.safeParseAsync(subject_id);

        if (!id_validation.success)
            throw new SubjectValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const subject = await this.subject_repository.getById(id)

        if(!subject)
            throw new SubjectNotFound()

        const data_validation = await update_subject_schema.safeParseAsync(class_data);

        if (!data_validation.success)
            throw new SubjectValidationDataError(data_validation.error.formErrors.fieldErrors);

        const subject_data_validated = data_validation.data;

        const updated = await this.subject_repository.updateById(id, subject_data_validated);

        return updated;
    };
}