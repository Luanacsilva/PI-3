export class AnnouncementValidationDataError extends Error {
    constructor(cause?: object | string) {
        super();
        this.name = "AnnouncementValidationDataError";
        this.message = "Erro ao validar os dados o anuncio.";
        this.cause = cause;
    }
}

export class AnnouncementNotFound extends Error {
    constructor() {
        super();
        this.name = "AnnouncementNotFound";
        this.message = "Não foi possivel encontrar o anuncio desejada.";
    }
}