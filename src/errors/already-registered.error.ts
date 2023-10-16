import { BaseError } from './base.error';

export class AlreadyRegisteredError extends BaseError {
    constructor(private readonly email: string) {
        super();
    }

    toJson(): any {
        return {
            error: `An account already exists for email ${this.email}.`,
        };
    }

    getStatus(): number {
        return 400;
    }
}