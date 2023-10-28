import Joi from 'joi';
import { BaseError } from './base.error';

/**
 * Error used to indicate an invalid input.
 */
export class ValidationError extends BaseError {
    constructor(private readonly error: Joi.ValidationError) {
        super();
    }

    toJson(): object {
        return {
            error: 'Provided input was incorrect.',
            details: this.error.details.map((detail) => detail.message),
        };
    }

    getStatus(): number {
        return 400;
    }
}
