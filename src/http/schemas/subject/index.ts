import z from "zod";
import { id_schema, schema_error_messages } from "..";

const subject_name_schema = z.string({
    invalid_type_error: schema_error_messages.invalid_type.string,
    required_error: schema_error_messages.required_field,
})
    .min(1, schema_error_messages.required_field);

const subject_description_schema = z.string({
    invalid_type_error: schema_error_messages.invalid_type.string,
    required_error: schema_error_messages.required_field,
})
    .min(1, schema_error_messages.required_field);


export const create_subject_schema = z.object({
    id: id_schema.optional(),
    name: subject_name_schema,
    description: subject_description_schema
});

export const update_subject_schema = z.object({
    id: id_schema.optional(),
    name: subject_name_schema.optional(),
    description: subject_description_schema.optional()
});