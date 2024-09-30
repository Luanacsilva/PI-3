export class ClassValidationDataError extends Error {
    constructor(cause?: object | string) {
        super();
        this.name = "ClassValidationDataError";
        this.message = "Erro ao validar os dados de classe.";
        this.cause = cause;
    }
}

export class ClassNotFound extends Error {
    constructor() {
        super();
        this.name = "ClassNotFound";
        this.message = "Não foi possivel encontrar a classe desejada.";
    }
}