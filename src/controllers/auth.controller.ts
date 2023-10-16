import { Handler, NextFunction, Request, Response } from 'express';
import * as useCases from '../use-cases/auth';
import { IUser } from '../models/User';
import Joi from 'joi';
import { ValidationError } from '../errors';

export const login: Handler = async (req: Request, res: Response) => {
    const result = await useCases.generateToken(req.user as IUser);
    res.json(result);
}

export const signup: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(255).required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new ValidationError(error);
        }

        const result = await useCases.signup(value.email, value.password);

        return res.json(result);
    } catch (err) {
        next(err);
    }
}

export const refresh: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            refreshToken: Joi.string().uuid().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw new ValidationError(error);
        }

        const result = await useCases.refreshToken(value.refreshToken);

        return res.json(result);
    } catch (err) {
        next(err);
    }
}