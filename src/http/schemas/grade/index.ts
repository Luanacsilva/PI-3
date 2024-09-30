import z from "zod";
import { id_schema } from "..";


export const create_grade_schema = z.object({
    id: id_schema.optional(),
    student_id: id_schema,
    subject_id: id_schema,
    grade: z.number()
});

export const update_grade_schema = z.object({
    id: id_schema.optional(),
    student_id: id_schema.optional(),
    subject_id: id_schema.optional(),
    grade: z.number().optional()
});