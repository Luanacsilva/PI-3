import { GetUserByEmailUseCase } from "@/http/use_cases/user/read/get_user_by_email";
import { HTTPResponseFormat } from "@/types";
import { IUserRepository } from "@/types/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

export class AuthController {
    user_repository: IUserRepository;

    constructor(user_repository: IUserRepository) {
        this.user_repository = user_repository;
    }

    log_in = async (req: Request, res: Response, next: NextFunction) => {
        const http_response_body: HTTPResponseFormat = {
            status: 200,
            message: "Usuario autenticado com sucesso"
        };

        const { email, password } = req.body;

        const body_schema = z.object({
            email: z
                .string({
                    required_error: "Campo Ausente no Json"
                })
                .min(1, "Preencha o Campo"),

            password: z
                .string({
                    required_error: "Campo Ausente no Json"
                })
                .min(1, "Preencha o Campo")
        });

        const body_validation = await body_schema.safeParseAsync(req.body);

        if (!body_validation.success) {
            return res.send(body_validation.error.formErrors.fieldErrors);
        }

        const get_user_by_email = new GetUserByEmailUseCase(this.user_repository);

        try {
            const user = await get_user_by_email.execute(email);

            if (!await bcrypt.compare(password, user.password)) {
                http_response_body.status = 401;
                http_response_body.message = "Credenciais Invalidas";

                return res.status(http_response_body.status).json(http_response_body);
            }

            const payload = user;

            const token = jwt.sign(payload, 'secret', /* {expiresIn: "3"} */);

            http_response_body.data = {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }
            };

            return res.status(http_response_body.status).json(http_response_body);
        } catch (error) {
            return next(error);
        }
    };
}