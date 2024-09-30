export class SubjectValidationDataError extends Error {
    constructor(cause?: object | string) {
        super();
        this.name = "SubjectValidationDataError";
        this.message = "Erro ao validar os dados de subject.";
        this.cause = cause;
    }
}

export class SubjectNotFound extends Error {
    constructor() {
        super();
        this.name = "SubjectNotFound";
        this.message = "Não foi possivel encontrar a subject desejada.";
    }
}