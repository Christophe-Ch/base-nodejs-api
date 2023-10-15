import { Router } from 'express';
import { IRouter } from './router';
import * as controller from '../controllers/todo.controller';

const router = Router();

router.get('/', controller.findAll);
router.get('/:id', controller.find);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteTodo);

export default {
    router,
    path: '/todos'
} as IRouter;