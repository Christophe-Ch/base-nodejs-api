import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors";
import logger from "../logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        logger.error(err.toJson());
        return res.status(err.getStatus()).json(err.toJson());
    }

    res.status(500).json({
        errors: ['An error has occured. Try again later.']
    });
}