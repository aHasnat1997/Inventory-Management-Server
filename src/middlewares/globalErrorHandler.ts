/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { TErrorResponse } from "../interfaces/error.interface";
import { HTTPStatusCode } from "../utils/httpCode";
import { DuplicateKeyError, MongooseCastError, MongooseValidationError, ZodValidationError } from "../errors/HandleErrorResponse";
import { ZodError } from "zod";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = error.statusCode || HTTPStatusCode.InternalServerError;
    let resObject: TErrorResponse = {
        success: false,
        message: 'Something went wrong!',
        issue: [{
            path: '',
            message: error.message
        }]
    }

    if (error instanceof mongoose.Error.ValidationError) {
        statusCode = HTTPStatusCode.Forbidden;
        resObject = MongooseValidationError(error);
    }

    else if (error instanceof mongoose.Error.CastError) {
        statusCode = HTTPStatusCode.Forbidden;
        resObject = MongooseCastError(error);
    }

    else if (error instanceof ZodError) {
        statusCode = HTTPStatusCode.Forbidden;
        resObject = ZodValidationError(error);
    }

    else if (error.code === 11000) {
        statusCode = HTTPStatusCode.Conflict;
        resObject = DuplicateKeyError(error)
    }

    resObject.stack = error.stack;
    return res.status(statusCode).json(resObject);
};

export default globalErrorHandler;