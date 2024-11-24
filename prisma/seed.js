"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subject_1 = require("./seeders/subject");
const user_1 = require("./seeders/user");
const main = async () => {
    // ! - Not Working
    // await Promise.all([user_seeder, subject_seeder]);
    await (0, user_1.user_seeder)();
    await (0, subject_1.subject_seeder)();
};
main()
    .then(() => console.log("Seeder realizadas com sucesso"))
    .catch(() => console.log("Erro ao executar as seeders"));
