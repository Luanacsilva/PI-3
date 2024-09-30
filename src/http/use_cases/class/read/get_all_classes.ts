import { IClassRepository } from "@/types/class";

export class GetAllClassesUseCase {
    class_repository: IClassRepository;

    constructor(class_repository: IClassRepository) {
        this.class_repository = class_repository;
    }

    execute = async () => { 
        const classes = await this.class_repository.getAll()

        return classes
    };
}