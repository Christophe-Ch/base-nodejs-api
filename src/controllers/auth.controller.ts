import { Handler, NextFunction, Request, Response } from 'express';
import * as useCases from '../use-cases/auth';
import { IUser } from '../models/User';
import Joi from 'joi';
import { ValidationError } from '../errors';
import { NotFoundError } from '../errors/not-found.error';

export const login: Handler = async (req: Request, res: Response) => {
    const token = useCases.generateToken(req.user as IUser);
    res.json({ token });
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

        const token = await useCases.signup(value.email, value.password);

        return res.json({ token });
    } catch (err) {
        next(err);
    }
}