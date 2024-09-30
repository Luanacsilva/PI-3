import { prisma } from "@/database/prisma";
import { Class } from "@/types/class";
import { ISubjectRepository, Subject, SubjectInputArgs, SubjectUpdateArgs } from "@/types/subject";
import { User } from "@/types/user";


export class SubjectRepositoryPostgres implements ISubjectRepository {
    create = async (subject_data: SubjectInputArgs) => {
        const { id, name, description } = subject_data;

        const subject = await prisma.subject.create({
            data: { id, name, description }
        });

        return subject as Subject;
    };

    getAll = async () => {
        const subjects = await prisma.subject.findMany();

        return subjects as Subject[];
    };

    getById = async (subject_id: number) => {
        const subject = await prisma.subject.findUnique({
            where: { id: subject_id }
        });

        return subject as Subject | null;
    };

    updateById = async (subject_id: number, subject_data: SubjectUpdateArgs) => {
        const subject = await prisma.subject.update({
            where: { id: subject_id },
            data: subject_data
        });

        return subject;
    };

    deleteById = async (subject_id: number) => {
        await prisma.subject.delete({
            where: { id: subject_id }
        });

        return true;
    };


    getSubjectClasses = async (subject_id: number) => {
        const query = await prisma.class_Subject.findMany({
            where: { subject_id },
            include: { class: true }
        });

        const classes = query.map(classe => classe.class);

        return classes as Class[];
    };

    getTeacherFromSubject = async (subject_id: number) => {
        const users = await prisma.teacher_Subject.findMany({
            where: { subject_id },
            include: { teacher: true }
        });

        const teacher = users.map(user => user.teacher);

        return teacher;
    };
}