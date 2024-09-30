import { SubjectValidationDataError } from "@/exceptions/subject";
import { create_subject_schema } from "@/http/schemas/subject";
import { ISubjectRepository, SubjectInputArgs } from "@/types/subject";

export class CreateSubjectUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (subject_data: SubjectInputArgs) => {
        const data_validation = await create_subject_schema.safeParseAsync(subject_data)

        if (!data_validation.success) {
            const { fieldErrors } = data_validation.error.formErrors;

            throw new SubjectValidationDataError(fieldErrors);
        }

        const subject = await this.subject_repository.create(data_validation.data);

        return subject;
    };
}