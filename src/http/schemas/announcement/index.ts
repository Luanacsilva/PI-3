import z from "zod";
import { id_schema } from "..";

export const create_announcement_schema = z.object({
    id: id_schema.optional(),
    title: z.string(),
    content: z.string(),
    author_id: id_schema,
    creation_date: z.coerce.date().optional()
});
export const update_announcement_schema = z.object({
    id: id_schema.optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    author_id: id_schema.optional(),
    creation_date: z.coerce.date().optional()
});