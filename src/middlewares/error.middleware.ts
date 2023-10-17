import { Request, Response } from 'express';
import { BaseError } from '../errors';
import logger from '../logger';

/**
 * Handle errors and send appropriate response.
 * @param err Error
 * @param res Response
 */
export const errorHandler = (err: Error, _: Request, res: Response) => {
    if (err instanceof BaseError) {
        logger.error(err.toJson());
        return res.status(err.getStatusCode()).json(err.toJson());
    }

    res.status(500).json({
        errors: ['An error has occured. Try again later.']
    });
}