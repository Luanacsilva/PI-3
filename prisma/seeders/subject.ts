import { prisma } from "@/database/prisma";

export const subject_seeder = async () => {
    await prisma.subject.createMany({
        data: [
            {
                id: 1,
                name: "Matematica",
                description: "Aulas de Matematica"
            },

            {
                id: 2,
                name: "Portugues",
                description: "Aulas de Portugues"
            },

            {
                id: 3,
                name: "Fisica",
                description: "Aulas de Fisica"
            },

            {
                id: 4,
                name: "Quimica",
                description: "Aulas de Quimica"
            },

            {
                id: 5,
                name: "Inglês",
                description: "Aulas de Inglês"
            },

            {
                id: 6,
                name: "Geografia",
                description: "Aulas de Geografia"
            },

            {
                id: 7,
                name: "Historia",
                description: "Aulas de Historia"
            },

            {
                id: 8,
                name: "Educação Física",
                description: "Aulas de Educação Física"
            },
        ]
    });

    console.log("Seeder de Materias Concluida")
};