export class UserValidationDataError extends Error {
    constructor(cause?: object | string) {
        super();
        this.name = "UserValidationDataError";
        this.message = "Erro ao validar os dados do usuario.";
        this.cause = cause;
    }
}

export class UserNotFound extends Error {
    constructor() {
        super();
        this.name = "UserNotFound";
        this.message = "Não foi possivel encontrar o usuario desejada.";
    }
}

export class UserEmailAlreadyInUse extends Error {
    constructor() {
        super()
        this.name = "UserEmailAlreadyInUse"
        this.message = "Email do usuario já está sendo utilizado."
    }
}