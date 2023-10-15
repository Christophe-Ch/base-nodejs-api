import express, { Express } from 'express';
import routers from './routes';
import { errorHandler } from './middlewares';

function prepareApp(): Express {
    const app = express();

    app.use(express.json());

    routers.forEach(router => {
        app.use(router.path, router.router);
    });

    app.use(errorHandler);

    app.listen(3000, () => { console.log("Server listening on port 3000.") });

    return app;
}



export default prepareApp;