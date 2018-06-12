import RestError from './RestError';
import RestErrorParser from './RestErrorParser';

export default function ErrorParser(error, ctx) {
    if (error instanceof RestError) {
        return RestErrorParser(error, ctx);
    }

    ctx.status = error.status || 500;
    ctx.body = error.message;
}
