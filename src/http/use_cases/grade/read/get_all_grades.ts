import { IGradeRepository } from "@/types/grade";

export class GetAllGradesUseCase {
    grade_repository: IGradeRepository;

    constructor(grade_repository: IGradeRepository) {
        this.grade_repository = grade_repository;
    }

    execute = async () => { 
        const grades = await this.grade_repository.getAll()

        return grades
    };
}