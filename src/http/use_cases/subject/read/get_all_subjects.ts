import { ISubjectRepository } from "@/types/subject";

export class GetAllSubjectsUseCase {
    subject_repository: ISubjectRepository;

    constructor(subject_repository: ISubjectRepository) {
        this.subject_repository = subject_repository;
    }

    execute = async () => { 
        const subjects = await this.subject_repository.getAll()

        return subjects
    };
}