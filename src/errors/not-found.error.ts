import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
    constructor(private readonly id: string) {
        super();
    }

    toJson(): any {
        return {
            error: `No item found for id ${this.id}.`,
        };
    }

    getStatus(): number {
        return 404;
    }
}