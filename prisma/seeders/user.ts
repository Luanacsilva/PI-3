import { prisma } from "@/database/prisma";
import bcrypt from "bcrypt";

export const user_seeder = async () => {

    await prisma.user.create({
        data: {
            id: 1,
            name: "Coordenador",
            email: "coordenador@mediotec.com",
            password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
            type: "Coordinator",
        }
    });

    console.log("Seeder de Usuario Concluida");
};