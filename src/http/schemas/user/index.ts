import z from "zod";
import { id_schema, schema_error_messages } from "..";

const user_name_schema = z
    .string({
        invalid_type_error: schema_error_messages.invalid_type.string,
        required_error: schema_error_messages.required_field
    })
    .min(1, schema_error_messages.empty_field);

export const user_email_schema = z
    .string({
        invalid_type_error: schema_error_messages.invalid_type.string,
        required_error: schema_error_messages.required_field
    })
    .min(1, schema_error_messages.empty_field)
    .email("Formato de e-mail invalido.");

const user_password_schema = z
    .string({
        invalid_type_error: schema_error_messages.invalid_type.string,
        required_error: schema_error_messages.required_field
    })
    .min(1, schema_error_messages.empty_field);

const user_type_schema = z
    .enum(["Student", "Teacher", "Coordinator"], {
        message: "O valor do campo deve ser 'Student' ou 'Teacher' ou 'Coordinator'",
        required_error: schema_error_messages.required_field
    });

export const create_user_schema = z.object({
    id: id_schema.optional(),
    name: user_name_schema,
    email: user_email_schema,
    password: user_password_schema,
    type: user_type_schema
});

export const update_user_schema = z.object({
    id: id_schema.optional(),
    name: user_name_schema.optional(),
    email: user_email_schema.optional(),
    password: user_password_schema.optional(),
    type: user_type_schema.optional()
});