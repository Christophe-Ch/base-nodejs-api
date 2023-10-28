import { BaseError } from './base.error';

/**
 * Error used to indicate an email is already in use.
 */
export class AlreadyRegisteredError extends BaseError {
    constructor(private readonly email: string) {
        super();
    }

    toJson(): any {
        return {
            error: `An account already exists for email ${this.email}.`,
        };
    }

    getStatusCode(): number {
        return 400;
    }
}
