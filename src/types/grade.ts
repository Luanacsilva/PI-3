import { BaseRepository } from ".";


export type Grade = {
    id: number,
    student_id: number,
    subject_id: number,
    grade: number;
};

export type GradeInputArgs = {
    id?: number,
    student_id: number,
    subject_id: number,
    grade: number;
};

export type GradeUpdateArgs = {
    id?: number,
    student_id?: number,
    subject_id?: number,
    grade?: number;
};

export type IGradeRepository = BaseRepository<Grade, GradeInputArgs, GradeUpdateArgs> & {
    // TODO - Subject
    
    // TODO - User
}