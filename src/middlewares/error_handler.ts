import { AnnouncementNotFound, AnnouncementValidationDataError } from "@/exceptions/announcement";
import { ClassNotFound, ClassValidationDataError } from "@/exceptions/class";
import { GradeNotFound, GradeValidationDataError } from "@/exceptions/grade";
import { SubjectNotFound, SubjectValidationDataError } from "@/exceptions/subject";
import { UserEmailAlreadyInUse, UserNotFound, UserValidationDataError } from "@/exceptions/user";
import { HTTPResponseFormat } from "@/types";
import { NextFunction, Request, Response } from "express";

export const error_handler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    const http_response_body: HTTPResponseFormat = {
        status: 500,
        message: "Erro Interno do Servidor"
    };

    if (
        error instanceof ClassNotFound ||
        error instanceof SubjectNotFound ||
        error instanceof UserNotFound ||
        error instanceof GradeNotFound ||
        error instanceof AnnouncementNotFound
    ) {
        http_response_body.status = 404;
        http_response_body.message = error.message;

    } else if (
        error instanceof ClassValidationDataError ||
        error instanceof SubjectValidationDataError ||
        error instanceof UserValidationDataError ||
        error instanceof GradeValidationDataError ||
        error instanceof AnnouncementValidationDataError
    ) {
        http_response_body.status = 400;
        http_response_body.message = error.message;
        http_response_body.errors = error.cause as object;

    } else if (
        error instanceof UserEmailAlreadyInUse
    ) {
        http_response_body.status = 400;
        http_response_body.message = error.message;

    } else {
        http_response_body.status = 500;
        http_response_body.message = "Erro Interno do servidor";
    }

    return res.status(http_response_body.status).json(http_response_body);
};