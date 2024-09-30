import { BaseRepository } from ".";
import { Subject } from "./subject";
import { User } from "./user";

export type Class = {
    id: number,
    name: string,
    year: number,
    semester: number;
};

export type ClassInputArgs = {
    id?: number,
    name: string,
    year: number,
    semester: number;
};

export type ClassUpdateArgs = {
    id?: number,
    name?: string,
    year?: number,
    semester?: number;
};

export type IClassRepository = BaseRepository<Class, ClassInputArgs, ClassUpdateArgs> & {
    getClassSubjects: (class_id: number) => Promise<Subject[]>;
    addClassSubject: (class_id: number, subject_id: number) => Promise<Boolean>;
    removeClassSubject: (class_id: number, subject_id: number) => Promise<Boolean>;

    getStudentsFromClass: (class_id: number) => Promise<User[]>;
};