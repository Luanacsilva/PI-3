import z from "zod";
import { id_schema, schema_error_messages } from "..";

const class_name_schema = z.string({
    invalid_type_error: schema_error_messages.invalid_type.string,
    required_error: schema_error_messages.required_field,
})
    .min(1, schema_error_messages.required_field);

const class_year_schema = z
    .number({
        invalid_type_error: schema_error_messages.invalid_type.number,
        required_error: schema_error_messages.required_field,
    })
    .positive(schema_error_messages.number.positive);

const class_semester_schema = z
    .number({
        invalid_type_error: schema_error_messages.invalid_type.number,
        required_error: schema_error_messages.required_field,
    })
    .positive(schema_error_messages.number.positive);

export const create_class_schema = z.object({
    id: id_schema.optional(),
    name: class_name_schema,
    year: class_year_schema,
    semester: class_semester_schema
});


export const update_class_schema = z.object({
    id: id_schema.optional(),
    name: class_name_schema.optional(),
    year: class_year_schema.optional(),
    semester: class_semester_schema.optional()
});

export const add_class_subject_schema = z.object({
    class_id: id_schema,
    subject_id: id_schema
});

export const remove_class_subject_schema = z.object({
    class_id: id_schema,
    subject_id: id_schema
});