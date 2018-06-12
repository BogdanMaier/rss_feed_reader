import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';

// define mappings for folder - api endpoint
const routerConfigs = [{
    folder: 'api', prefix: '/api', secure: false,
}, {
    folder: 'test', prefix: '', secure: false,
}];

export default function routes() {
    const composed = routerConfigs.reduce((prev, curr) => {
        const routesFromFolder = importDir(`./${curr.folder}`);
        const router = new Router({
            prefix: curr.prefix,
        });

        Object.keys(routesFromFolder).map(name => routesFromFolder[name](router));

        return [router.routes(), router.allowedMethods(), ...prev];
    }, []);

    return compose(composed);
}
