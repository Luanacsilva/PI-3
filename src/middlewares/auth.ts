
import { HTTPResponseFormat } from "@/types";
import { User_Type } from "@/types/user";
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const response_body: HTTPResponseFormat = {
        status: 401,
        message: "Não autorizado"
    };

    const auth_header = req.headers.authorization;

    if (!auth_header) {
        response_body.message = "Token de Acesso Ausente";

        return res.status(response_body.status).json(response_body);
    }

    const [_, token] = auth_header.split(" ");

    try {
        const payload = jwt.verify(token, "secret");
        res.locals.user = payload;
        next();

    } catch (error) {
        response_body.status = 400;

        if (error instanceof JsonWebTokenError) {
            switch (error.message) {
                case 'invalid token':
                    response_body.message = "Token Invalido.";
                    break;

                case 'jwt malformed':
                    response_body.message = "Token Mal Informado.";
                    break;

                case 'jwt signature is required':
                    response_body.message = "Assinatura JWT necessaria.";
                    break;

                case 'invalid signature':
                    response_body.message = "Assinatura Invalida.";
                    break;

                default:
                    response_body.message = "Erro ao Verificar o Token";
                    break;
            }

        } else if (error instanceof TokenExpiredError) {
            response_body.message = "Token JWT Expirado.";

        } else {
            response_body.status = 500;
            response_body.message = "Erro Interno do Servidor.";
        }

        return res.status(response_body.status).json(response_body);
    }
};


export const is = (allowed_roles: Array<User_Type>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response_body: HTTPResponseFormat = {
            status: 401,
            message: "Você não possui um cargo autorizado para acessar esse recurso."
        };

        const { type } = res.locals.user;

        if (!allowed_roles.includes(type)) 
            return res.status(response_body.status).json(response_body);

        next();
    };
};