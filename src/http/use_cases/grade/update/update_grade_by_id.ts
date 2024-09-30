import { GradeNotFound, GradeValidationDataError } from "@/exceptions/grade";
import { SubjectNotFound } from "@/exceptions/subject";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { update_grade_schema } from "@/http/schemas/grade";
import { GradeUpdateArgs, IGradeRepository } from "@/types/grade";
import { ISubjectRepository } from "@/types/subject";
import { IUserRepository } from "@/types/user";

export class UpdatGradeByIdUseCase {
    grade_repository: IGradeRepository;
    user_repository: IUserRepository;
    subject_repository: ISubjectRepository;

    constructor(
        grade_repository: IGradeRepository,
        user_repository: IUserRepository,
        subject_repository: ISubjectRepository
    ) {
        this.grade_repository = grade_repository;
        this.user_repository = user_repository;
        this.subject_repository = subject_repository;
    }
    execute = async (grade_id: number, grade_data: GradeUpdateArgs) => {
        const id_validation = await id_schema.safeParseAsync(grade_id);

        if (!id_validation.success)
            throw new GradeValidationDataError({ grade_id: id_validation.error.formErrors.formErrors });

        const id = id_validation.data;

        const grade = await this.grade_repository.getById(id);

        if (!grade)
            throw new GradeNotFound();

        const data_validation = await update_grade_schema.safeParseAsync(grade_data);

        if (!data_validation.success)
            throw new GradeValidationDataError(data_validation.error.formErrors.fieldErrors);

        const { data } = data_validation;

        if (data.student_id) {
            const student = await this.user_repository.getById(data.student_id);

            if (!student)
                throw new UserNotFound();

            if (student.type.toString() != "Student")
                throw new UserValidationDataError({
                    user: "O Usuario não é um estudante"
                });
        }

        if (data.subject_id) {
            const subject = await this.subject_repository.getById(data.subject_id);

            if (!subject)
                throw new SubjectNotFound();
        }

        const grade_data_validated = data_validation.data;

        const updated = await this.grade_repository.updateById(id, grade_data_validated);

        return updated;
    };
}