import { subject_seeder } from "./seeders/subject";
import { user_seeder } from "./seeders/user";

const main = async () => {
    // ! - Not Working
    // await Promise.all([user_seeder, subject_seeder]);

    await user_seeder();
    await subject_seeder();
};

main()
    .then(() => console.log("Seeder realizadas com sucesso"))
    .catch(() => console.log("Erro ao executar as seeders"));