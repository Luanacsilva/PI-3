import { SubjectNotFound, SubjectValidationDataError } from "@/exceptions/subject";
import { id_schema } from "@/http/schemas";
import { ISubjectRepository } from "@/types/subject";

export class DeleteSubjectByIdUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (subject_id: number) => {
        const id_validation = await id_schema.safeParseAsync(subject_id);

        if (!id_validation.success)
            throw new SubjectValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const subject = await this.subject_repository.getById(id);

        if (!subject)
            throw new SubjectNotFound();

        const isDeleted = await this.subject_repository.deleteById(id);

        return isDeleted;
    };
}