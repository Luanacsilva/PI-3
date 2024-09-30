import { GradeNotFound, GradeValidationDataError } from "@/exceptions/grade";
import { id_schema } from "@/http/schemas";
import { IGradeRepository } from "@/types/grade";

export class GetGradeByIdUseCase {
    grade_repository: IGradeRepository;

    constructor(grade_repository: IGradeRepository) {
        this.grade_repository = grade_repository;
    }

    execute = async (class_id: number) => {
        const id_validation = await id_schema.safeParseAsync(class_id);

        if (!id_validation.success) {
            throw new GradeValidationDataError({
                grade_id: id_validation.error.formErrors.formErrors
            });
        }

        const id = id_validation.data;

        const grade = await this.grade_repository.getById(id);

        if (!grade)
            throw new GradeNotFound();

        return grade;
    };
}