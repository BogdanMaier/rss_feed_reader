import ErrorParser from '../errors/ErrorParser';


export const exceptionMiddleware = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        global.logger.error(err.message, '\n', err.stack);
        ErrorParser(err, ctx);
    }
};

export const testMiddleware = async (ctx, next) => {
    try {
        ctx.response.status = 200;
        ctx.response.body = 'ok';
    } catch (err) {
        global.logger.error(err, ctx);
    }
};

export const error404Middleware = async (ctx, next) => {
    try {
        ctx.response.status = 404;
        ctx.response.body = '404';
    } catch (err) {
        global.logger.error(err.message, err.stack); // TODO check
    }
};
