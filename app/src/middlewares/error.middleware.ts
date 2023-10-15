import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof BaseError) {
        return res.status(err.getStatus()).json(err.toJson());
    }

    res.status(500).json({
        errors: ['An error has occured. Try again later.']
    });
}