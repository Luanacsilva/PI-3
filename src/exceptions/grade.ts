export class GradeValidationDataError extends Error {
    constructor(cause?: object | string) {
        super();
        this.name = "GradeValidationDataError";
        this.message = "Erro ao validar os dados de nota.";
        this.cause = cause;
    }
}

export class GradeNotFound extends Error {
    constructor() {
        super();
        this.name = "GradeNotFound";
        this.message = "Não foi possivel encontrar a nota desejada.";
    }
}