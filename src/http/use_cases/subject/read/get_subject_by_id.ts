import { SubjectNotFound, SubjectValidationDataError } from "@/exceptions/subject";
import { id_schema } from "@/http/schemas";
import { ISubjectRepository } from "@/types/subject";

export class GetSubjectByIdUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (class_id: number) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success) {
            throw new SubjectValidationDataError({
                subject_id: id_validation.error.formErrors.formErrors
            });
        }

        const id = id_validation.data;

        const subject = await this.subject_repository.getById(id);

        if (!subject)
            throw new SubjectNotFound();

        return subject;
    };
}