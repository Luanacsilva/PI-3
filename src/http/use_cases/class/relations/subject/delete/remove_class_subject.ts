import { ClassNotFound, ClassValidationDataError } from "@/exceptions/class";
import { SubjectNotFound } from "@/exceptions/subject";
import { remove_class_subject_schema } from "@/http/schemas/class";
import { IClassRepository } from "@/types/class";
import { ISubjectRepository } from "@/types/subject";

export class RemoveClassSubjectUseCase {
    class_repository: IClassRepository;
    subject_repository: ISubjectRepository;

    constructor(class_repository: IClassRepository, subject_repository: ISubjectRepository) {
        this.class_repository = class_repository;
        this.subject_repository = subject_repository;
    }

    execute = async ({ class_id, subject_id }: { class_id: number, subject_id: number; }) => {
        const relation_ids_validation = await remove_class_subject_schema.safeParseAsync({
            class_id,
            subject_id
        });

        if (!relation_ids_validation.success)
            throw new ClassValidationDataError(relation_ids_validation.error.formErrors.fieldErrors);

        const classe = await this.class_repository.getById(class_id);

        if (!classe)

            throw new ClassNotFound();

        const subject = await this.subject_repository.getById(subject_id);

        if (!subject)
            throw new SubjectNotFound();

        const remove = await this.class_repository.removeClassSubject(
            relation_ids_validation.data.class_id,
            relation_ids_validation.data.subject_id
        );

        return remove;
    };
}