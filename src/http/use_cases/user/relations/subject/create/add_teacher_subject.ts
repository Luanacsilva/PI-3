import { ClassNotFound } from "@/exceptions/class";
import { UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { id_schema } from "@/http/schemas";
import { ISubjectRepository } from "@/types/subject";
import { IUserRepository } from "@/types/user";

export class addTeacherSubjectUseCase {
    user_repository: IUserRepository;
    subject_repository: ISubjectRepository;

    constructor(user_repository: IUserRepository, subject_repository: ISubjectRepository) {
        this.user_repository = user_repository;
        this.subject_repository = subject_repository;
    }

    execute = async (teacher_id: number, subject_id: number) => {
        const user_id_validation = await id_schema.safeParseAsync(teacher_id);
        const subject_id_validation = await id_schema.safeParseAsync(subject_id);

        if (!user_id_validation.success)
            throw new UserValidationDataError({
                user_id: user_id_validation.error.formErrors.formErrors
            });

        if (!subject_id_validation.success)
            throw new UserValidationDataError({
                subject_id: subject_id_validation.error.formErrors.formErrors
            });

        const teacher = await this.user_repository.getById(user_id_validation.data);

        if (!teacher)
            throw new UserNotFound();

        // TODO - Uma alternativa mas se for fazer corretamente mudar o Erro
        if(teacher.type.toString() != "Teacher")
            throw new UserValidationDataError({
                user_type: "Usuario não é professor"
            })

        const subject = await this.subject_repository.getById(subject_id_validation.data);

        if (!subject)
            throw new ClassNotFound();

         // TODO - Verificar se já existe 
         const teacher_subject = await this.user_repository.getTeacherSubjects(user_id_validation.data);

         const in_class = teacher_subject.find((teacher_subject) => teacher_subject.id == subject.id);
 
         // TODO - Mudar o Erro
         if (in_class)
             throw new UserValidationDataError({
                 user_class: "O professor já está na Sala"
             });

        await this.user_repository.addTeacherSubject(user_id_validation.data, subject_id_validation.data);

        return true;
    };
}