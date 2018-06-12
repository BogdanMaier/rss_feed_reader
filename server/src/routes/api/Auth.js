import { createReadStream } from 'fs';
import Authentication from '../../services/Auth';

const PATH_LOGIN = '/login';

const authenticateEmail = async (ctx, next) => {
    const data = await Authentication.authenticateEmail(ctx.request.body, ctx);
    ctx.response.status = 200;
    ctx.response.body = { data };
};

export default (router) => {
    router.post(PATH_LOGIN, authenticateEmail);
};
