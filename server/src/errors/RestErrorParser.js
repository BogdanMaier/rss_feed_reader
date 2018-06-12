export default function RestErrorParser(error, ctx) {
    ctx.body = {
        code: error.code,
        message: error.message,
    };
    ctx.status = error.httpCode || 400;
}
