import { Router } from 'express';
import { IRouter } from './router';
import passport from 'passport';
import * as controller from '../controllers/auth.controller';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), controller.login);
router.post('/signup', controller.signup);

export default {
    router,
    path: '/auth'
} as IRouter;