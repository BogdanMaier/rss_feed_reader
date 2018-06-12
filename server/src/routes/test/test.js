import { testMiddleware } from '../../utils/MiddlewareUtil';

export default (router) => {
    router.get('/test', testMiddleware);
};
