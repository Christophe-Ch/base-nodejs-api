import Joi from 'joi';
import { BaseError } from './base.error';

export class ValidationError extends BaseError {
    constructor(private readonly error: Joi.ValidationError) {
        super();
    }

    toJson(): any {
        return {
            error: 'Provided input was incorrect.',
            details: this.error.details.map(detail => detail.message)
        };
    }

    getStatus(): number {
        return 400;
    }
}