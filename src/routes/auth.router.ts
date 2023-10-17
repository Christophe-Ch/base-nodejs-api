import { Router } from 'express';
import { IRouter } from './router';
import passport from 'passport';
import * as controller from '../controllers/auth.controller';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), controller.login);
router.post('/signup', controller.signup);
router.post('/refresh', controller.refresh);
router.post('/delete-account', passport.authenticate('jwt', { session: false }), controller.deleteAccount);

export default {
    router,
    path: '/auth'
} as IRouter;