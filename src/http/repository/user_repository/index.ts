import { prisma } from "@/database/prisma";
import { Announcement } from "@/types/announcement";
import { Class } from "@/types/class";
import { Grade } from "@/types/grade";
import { Subject } from "@/types/subject";
import { IUserRepository, User, UserInputArgs, UserUpdateArgs } from "@/types/user";

export class UserRepositoryPostgres implements IUserRepository {
    create = async (user_data: UserInputArgs) => {
        const { id, name, email, password, type } = user_data;

        const user = await prisma.user.create({
            data: {
                id, name, email, password,
                type: type
            }
        });

        return user as User;
    };

    getAll = async () => {
        const users = await prisma.user.findMany();

        return users as User[];
    };


    getById = async (user_id: number) => {
        const user = await prisma.user.findUnique({
            where: { id: user_id }
        });

        return user;
    };

    getByEmail = async (user_email: string) => {
        const user = await prisma.user.findUnique({
            where: { email: user_email }
        });

        return user;
    };

    updateById = async (user_id: number, user_data: UserUpdateArgs) => {
        const user = await prisma.user.update({
            where: { id: user_id },
            data: user_data
        });

        return user as User;
    };

    deleteById = async (user_id: number) => {
        await prisma.user.delete({
            where: { id: user_id }
        });

        return true;
    };

    addStudentClass = async (user_id: number, class_id: number) => {
        await prisma.student_Class.create({
            data: { class_id, student_id: user_id }
        });

        return true;
    };

    getStudentClasses = async (user_id: number) => {
        const query = await prisma.student_Class.findMany({
            where: { student_id: user_id },
            include: { class: true }
        });

        const classes = query.map(q => q.class);

        return classes as Class[];
    };

    removeStudentClass = async (user_id: number, class_id: number) => {
        await prisma.student_Class.delete({
            where: {
                student_id_class_id: {
                    class_id,
                    student_id: user_id
                }
            }
        });

        return true;
    };

    addTeacherSubject = async (user_id: number, subject_id: number) => {
        await prisma.teacher_Subject.create({
            data: { subject_id, teacher_id: user_id }
        });

        return true;
    };

    getTeacherSubjects = async (user_id: number) => {
        const query = await prisma.teacher_Subject.findMany({
            where: { teacher_id: user_id },
            include: { subject: true }
        });

        const subject = query.map(q => q.subject);

        return subject as Subject[];
    };

    removeTeacherSubject = async (user_id: number, subject_id: number) => {
        await prisma.teacher_Subject.delete({
            where: {
                teacher_id_subject_id: {
                    subject_id,
                    teacher_id: user_id
                }
            }
        });

        return true;
    };

    getStudentGrades = async (student_id: number) => {
        const query = await prisma.grade.findMany({
            where: { student_id },
            include: { subject: true }
        });

        const grades_info = query

        return grades_info ;
    };

    getUserAnnouncements = async (user_id: number) => {
        const query = await prisma.announcement.findMany({
            where: { author_id: user_id }
        });

        return query as Announcement[];
    };
}