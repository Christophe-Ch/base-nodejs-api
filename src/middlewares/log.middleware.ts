import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const logHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.info({ endpoint: req.url, ip: req.socket.remoteAddress });
    next();
}