export abstract class BaseError extends Error {
    abstract toJson(): any;
    getStatus(): number { return 500; }
}