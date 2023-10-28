export abstract class BaseError extends Error {
    /**
     * Get the formatted error.
     * @returns Formatted error;
     */
    abstract toJson(): object;

    /**
     * HTTP status code
     * @returns Status code
     */
    getStatusCode(): number {
        return 500;
    }
}
