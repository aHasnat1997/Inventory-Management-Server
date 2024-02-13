import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Handel asynchronous request
 * @param fn async function
 * @returns Promise
 */
const handleAsyncReq = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error));
    }
};

export default handleAsyncReq;