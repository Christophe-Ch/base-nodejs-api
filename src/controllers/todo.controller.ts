import { Handler, NextFunction, Request, Response } from 'express';
import * as useCases from '../use-cases/todo';
import Joi from 'joi';
import { ValidationError } from '../errors';

export const findAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await useCases.findAll(req.user!.id);
        res.json({ todos });
    } catch (err) {
        next(err);
    }
}

export const find: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.string().length(24).required()
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            throw new ValidationError(error);
        }

        const todo = await useCases.find(value.id, req.user!.id);

        return res.json({ todo });
    } catch (err) {
        next(err);
    }
}

export const create: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            title: Joi.string().max(255).required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new ValidationError(error);
        }

        const todo = await useCases.create(value.title, req.user!.id);

        return res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
}

export const update: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const querySchema = Joi.object({
            id: Joi.string().length(24).required()
        });
        let { error, value } = querySchema.validate(req.params);
        if (error) {
            throw new ValidationError(error);
        }

        const bodySchema = Joi.object({
            title: Joi.string().max(255),
            done: Joi.bool()
        });
        ({ error, value } = bodySchema.validate(req.body));
        if (error) {
            throw new ValidationError(error);
        }

        const todo = await useCases.update(req.params.id, value.title, value.done, req.user!.id);

        return res.status(200).json({ todo });
    } catch (err) {
        next(err);
    }
}

export const deleteTodo: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const querySchema = Joi.object({
            id: Joi.string().length(24).required()
        });
        const { error, value } = querySchema.validate(req.params);
        if (error) {
            throw new ValidationError(error);
        }

        await useCases.deleteTodo(value.id, req.user!.id);

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}