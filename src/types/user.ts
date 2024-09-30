import { BaseRepository } from ".";
import { Announcement } from "./announcement";
import { Class } from "./class";
import { Grade } from "./grade";
import { Subject } from "./subject";

export type User_Type = "Student" | "Teacher" | "Coordinator";

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    type: User_Type;
};

export type UserInputArgs = {
    id?: number,
    name: string,
    email: string,
    password: string,
    type: User_Type;
};

export type UserUpdateArgs = {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    type?: User_Type;
};

export type student_grade = Grade & { subject: Subject; };


export type IUserRepository = BaseRepository<User, UserInputArgs, UserUpdateArgs> & {
    getByEmail: (user_email: string) => Promise<User | null>;

    addStudentClass: (user_id: number, class_id: number) => Promise<Boolean>;
    getStudentClasses: (user_id: number) => Promise<Class[]>;
    removeStudentClass: (user_id: number, class_id: number) => Promise<Boolean>;

    addTeacherSubject: (user_id: number, subject_id: number) => Promise<Boolean>;
    getTeacherSubjects: (user_id: number) => Promise<Subject[]>;
    removeTeacherSubject: (user_id: number, subject_id: number) => Promise<Boolean>;

    getStudentGrades: (student_id: number) => Promise<student_grade[]>;

    getUserAnnouncements: (user_id: number) => Promise<Announcement[]>;
};