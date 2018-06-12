import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import Config from '../conf/config';
import routes from './routes';
import {
    exceptionMiddleware,
    error404Middleware,
} from './utils/MiddlewareUtil';
import JsonStore from './services/db/JsonStore';

const app = new Koa();
const environment = process.env.NODE_ENV;
const port = process.env.PORT;

const store = global.store = JsonStore;

const logger = {
    info: (msg) => {
        console.log(msg);
    },
    error: (msg) => {
        console.error(msg);
    },
};

const config = Config.load(environment || 'development');
global.logger = logger;

logger.info('Starting server...');

(async () => {
    try {
        app.listen(port || config.port);
        logger.info(`✅ Server started at port ${port || config.port}.`);

        store.setupData();

        app.use(cors())
            .use(bodyParser({ extended: true }))
            .use(morgan('dev'))
            .use(exceptionMiddleware)
            .use(routes())
            .use(error404Middleware);

        // ctrl + c interruption cleanup
        process.on('SIGINT', () => {
           // do cleanup: db connection, etc...
            store.saveData();
        });
    } catch (err) {
        logger.error(err.stack);
    }
})();
