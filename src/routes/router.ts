import * as core from 'express-serve-static-core';

export interface IRouter {
    router: core.Router,
    path: string
}