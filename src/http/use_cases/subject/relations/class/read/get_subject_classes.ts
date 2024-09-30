import { SubjectNotFound, SubjectValidationDataError } from "@/exceptions/subject";
import { id_schema } from "@/http/schemas";
import { ISubjectRepository } from "@/types/subject";

export class getSubjectClassesUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async (subject_id: number) => {
        const id_validation = await id_schema.safeParseAsync(subject_id);

        if (!id_validation.success)
            throw new SubjectValidationDataError({
                subject_id: id_validation.error.formErrors.formErrors
            });

        const classe_exist = await this.subject_repository.getById(id_validation.data)
        
        if(!classe_exist)
            throw new SubjectNotFound()

        const classes = await this.subject_repository.getSubjectClasses(id_validation.data);

        return classes;
    };
}