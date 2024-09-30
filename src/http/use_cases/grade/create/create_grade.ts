import { GradeValidationDataError } from "@/exceptions/grade";
import { SubjectNotFound } from "@/exceptions/subject";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { create_grade_schema } from "@/http/schemas/grade";
import { GradeInputArgs, IGradeRepository } from "@/types/grade";
import { ISubjectRepository } from "@/types/subject";
import { IUserRepository } from "@/types/user";

export class CreateGradeUseCase {
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

    execute = async (grade_data: GradeInputArgs) => {
        const grade_data_validation = await create_grade_schema.safeParseAsync(grade_data);

        if (!grade_data_validation.success) {
            const { fieldErrors } = grade_data_validation.error.formErrors;

            throw new GradeValidationDataError(fieldErrors);
        }

        const { data } = grade_data_validation;

        const student = await this.user_repository.getById(data.student_id);

        if (!student)
            throw new UserNotFound();

        if (student.type.toString() != "Student")
            throw new UserValidationDataError({
                user: "O Usuario não é um estudante"
            });

        const subject = await this.subject_repository.getById(data.subject_id);

        if(!subject)
            throw new SubjectNotFound()

        const grade = await this.grade_repository.create(data);

        return grade;
    };
}