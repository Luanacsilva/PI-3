import { prisma } from "@/database/prisma";
import { Class, ClassInputArgs, ClassUpdateArgs, IClassRepository } from "@/types/class";
import { Subject } from "@/types/subject";
import { User } from "@/types/user";

export class ClassRepositoryPostgres implements IClassRepository {
    create = async (class_data: ClassInputArgs) => {
        const { name, semester, year, id } = class_data;

        const classe = await prisma.class.create({
            data: { id, name, semester, year }
        });

        return classe as Class;
    };

    getAll = async () => {
        const classes = await prisma.class.findMany();

        return classes as Class[];
    };

    getById = async (class_id: number) => {
        const classe = await prisma.class.findUnique({
            where: { id: class_id }
        });

        return classe as Class | null;
    };

    updateById = async (class_id: number, class_data: ClassUpdateArgs) => {
        const classe = await prisma.class.update({
            where: { id: class_id },
            data: class_data
        });

        return classe;
    };

    deleteById = async (class_id: number) => {
        await prisma.class.delete({
            where: { id: class_id }
        });

        return true;
    };

    getClassSubjects = async (class_id: number) => {
        const query = await prisma.class_Subject.findMany({
            where: { class_id },
            include: { subject: true }
        });

        const subjects_dto = query.map(info => info.subject);

        return subjects_dto as Subject[];
    };

    addClassSubject = async (class_id: number, subject_id: number) => {
        await prisma.class_Subject.create({
            data: { class_id, subject_id }
        });

        return true;
    };

    removeClassSubject = async (class_id: number, subject_id: number) => {
        await prisma.class_Subject.delete({
            where: {
                class_id_subject_id: {
                    class_id,
                    subject_id
                }
            }
        });

        return true;
    };

    getStudentsFromClass = async (class_id: number) => {
        const users = await prisma.student_Class.findMany({
            where: { class_id },
            include: { student: true }
        });

        const students = users.map(user => user.student);

        return students as User[];
    };
}