import express, { Express } from 'express';
import routers from './routes';
import { errorHandler } from './middlewares';
import logger from './logger';
import { logHandler } from './middlewares/log.middleware';
import { setupAuth } from './auth/setup';
import mongoSanitize from 'express-mongo-sanitize';

function prepareApp(): Express {
    const app = express();

    app.use(logHandler);
    app.use(express.json());

    routers.forEach(router => {
        app.use(router.path, router.router);
    });

    app.use(errorHandler);
    app.use(mongoSanitize());

    setupAuth();

    app.listen(process.env.APP_PORT, () => { logger.info(`Server listening on port ${process.env.APP_PORT}.`) });

    return app;
}

export default prepareApp;