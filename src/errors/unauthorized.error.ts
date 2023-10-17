import { BaseError } from './base.error';

/**
 * Error used to the action is not authorized.
 */
export class UnauthorizedError extends BaseError {
    constructor() {
        super();
    }

    toJson(): any {
        return {
            error: `Unauthorized.`,
        };
    }

    getStatusCode(): number {
        return 401;
    }
}