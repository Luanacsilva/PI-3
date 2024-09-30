import { BaseRepository } from ".";
import { Class } from "./class";
import { User } from "./user";

export type Subject = {
    id: number,
    name: string,
    description: string;
};

export type SubjectInputArgs = {
    id?: number,
    name: string,
    description: string;
};

export type SubjectUpdateArgs = {
    id?: number,
    name?: string,
    description?: string;
};

export type ISubjectRepository = BaseRepository<Subject, SubjectInputArgs, SubjectUpdateArgs> & {
    getSubjectClasses: (subject_id: number) => Promise<Class[]>

    getTeacherFromSubject: (subject_id: number) => Promise<User[]>

    // TODO - Grades
}