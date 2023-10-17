import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

/**
 * Log all endpoint requests.
 * @param req Request
 * @param next Next handler
 */
export const logHandler = (req: Request, _: Response, next: NextFunction) => {
    logger.info({ endpoint: req.url, ip: req.socket.remoteAddress });
    next();
}