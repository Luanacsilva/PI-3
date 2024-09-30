import { GradeNotFound, GradeValidationDataError } from "@/exceptions/grade";
import { id_schema } from "@/http/schemas";
import { IGradeRepository } from "@/types/grade";

export class DeleteGradeByIdUseCase {
    grade_repository: IGradeRepository;

    constructor(grade_repository: IGradeRepository) {
        this.grade_repository = grade_repository;
    }

    execute = async (grade_id: number) => {
        const id_validation = await id_schema.safeParseAsync(grade_id);

        if (!id_validation.success)
            throw new GradeValidationDataError({ id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const classe = await this.grade_repository.getById(id);

        if (!classe)
            throw new GradeNotFound();

        const isDeleted = await this.grade_repository.deleteById(id);

        return isDeleted;
    };
}