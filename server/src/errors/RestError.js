export default class RestError extends Error {
    constructor(code, msg, httpCode) {
        super();
        this.code = code;
        this.message = msg;
        this.httpCode = httpCode;
    }
}
