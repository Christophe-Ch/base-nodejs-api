import { Router } from 'express';
import { IRouter } from './router';
import * as controller from '../controllers/todo.controller';
import passport from 'passport';

const router = Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.findAll,
);
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.find,
);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.create,
);
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.update,
);
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.deleteTodo,
);

export default {
    router,
    path: '/todos',
} as IRouter;
