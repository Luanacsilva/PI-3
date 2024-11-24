import z from "zod";
import { id_schema, schema_error_messages } from "..";

export const create_grade_schema = z.object({
    id: id_schema.optional(),
    student_id: id_schema,
    subject_id: id_schema,
    grade: z
        .number({ message: schema_error_messages.invalid_type.number })
        .nonnegative("A nota deve ser superior ou igual a zero")
        .max(10, "A nota maxima é 10")
});

export const update_grade_schema = z.object({
    id: id_schema.optional(),
    student_id: id_schema.optional(),
    subject_id: id_schema.optional(),
    grade: z
        .number({ message: schema_error_messages.invalid_type.number })
        .nonnegative("A nota deve ser superior ou igual a zero")
        .max(10, "A nota maxima é 10")
        .optional()
});