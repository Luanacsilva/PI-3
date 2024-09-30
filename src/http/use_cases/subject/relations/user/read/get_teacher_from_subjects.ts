import { SubjectValidationDataError } from "@/exceptions/subject";
import { id_schema } from "@/http/schemas";
import { ISubjectRepository } from "@/types/subject";

export class getTeacherFromSubjectUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (subject_id: number) => {
        const subject_id_validation = await id_schema.safeParseAsync(subject_id);

        if (!subject_id_validation.success)
            throw new SubjectValidationDataError({
                subject_id: subject_id_validation.error.formErrors.formErrors
            });

        const teachers = await this.subject_repository.getTeacherFromSubject(subject_id_validation.data);

        return teachers;
    };
}