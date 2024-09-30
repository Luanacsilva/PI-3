import { IUserRepository } from "@/types/user";

export class GetAllUsersUseCase {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    execute = async () => {
        const users = await this.user_repository.getAll()

        return users
    };
}