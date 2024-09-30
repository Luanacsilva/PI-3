import { prisma } from "@/database/prisma";
import { Grade, GradeInputArgs, GradeUpdateArgs, IGradeRepository } from "@/types/grade";

export class GradeRepositoryPostgres implements IGradeRepository {
    create = async (data: GradeInputArgs) => {
        const grade = await prisma.grade.create({
            data: data
        });

        return grade as Grade;
    };

    getAll = async () => {
        const grades = await prisma.grade.findMany();

        return grades as Grade[] | null;
    };

    getById = async (id: number) => {
        const grade = await prisma.grade.findUnique({
            where: { id }
        });

        return grade as Grade | null;
    };

    updateById = async (id: number, data: GradeUpdateArgs) => {
        const grade = await prisma.grade.update({
            where: { id },
            data: data
        });

        return grade;
    };
    
    deleteById = async (id: number) => {
        const grade = await prisma.grade.delete({
            where: { id }
        });

        return true;
    };
}