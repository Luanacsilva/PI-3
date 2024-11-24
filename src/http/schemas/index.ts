import z from "zod";

export const schema_error_messages = {
    invalid_type: {
        string: "O valor do campo deve ser um texto.",
        number: "O valor do campo deve ser um numero."
    },
    required_field: "Campo ausente.",
    empty_field: "Preencha esse campo",
    number: {
        positive: "O valor deve ser maior que 0",
        min_1: "O valor deve ser maior que 0" //
    }
}; 

export const id_schema = z
    .number({
        invalid_type_error: schema_error_messages.invalid_type.number,
        required_error: schema_error_messages.required_field,
    })
    .positive(schema_error_messages.number.positive);
