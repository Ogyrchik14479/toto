module.exports = class BaseApiException extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedException() {
        return new BaseApiException(401, "Пользователь не авторизован");
    }

    static BadRequest(message, errors = []) {
        return new BaseApiException(400, message, errors);
    }
}