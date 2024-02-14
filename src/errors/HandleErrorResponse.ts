/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorResponse } from "../types/error.type";
import { ZodError } from "zod";

/**
 * Error response for Validation Error
 * @param error Mongoose ValidationError Obj
 * @returns Error response
 */
export const MongooseValidationError = (error: mongoose.Error.ValidationError): TErrorResponse => {
    const response: TErrorResponse = {
        success: false,
        message: error.message,
        issue: []
    };
    const errors = error.errors;
    const errArray = Object.values(errors).map(e => {
        return {
            path: e.path,
            message: e.message
        }
    });
    response.issue = errArray

    return response
};

/**
 * Error response for Cast Error
 * @param error Mongoose CastError Obj
 * @returns Error response
 */
export const MongooseCastError = (error: mongoose.Error.CastError): TErrorResponse => {
    const response: TErrorResponse = {
        success: false,
        message: error.message,
        issue: []
    };
    const errArray = [
        {
            path: '',
            message: error.message
        }
    ];
    response.issue = errArray

    return response
};

/**
 * Error response for Zod Error
 * @param error Zod Error Obj
 * @returns Error response
 */
export const ZodValidationError = (error: ZodError): TErrorResponse => {
    const response: TErrorResponse = {
        success: false,
        message: 'Not valid data input...',
        issue: []
    };
    const errors = error.errors;
    const errArray = Object.values(errors).map(e => {
        return {
            path: e.path[0],
            message: e.message
        }
    });
    response.issue = errArray as []

    return response
};

/**
 * Error response for Duplicate Key Error
 * @param error Duplicate Error Obj
 * @returns Error response
 */
export const DuplicateKeyError = (error: any): TErrorResponse => {
    const response: TErrorResponse = {
        success: false,
        message: 'Duplicate key',
        issue: []
    };
    const issue = error.keyValue
    const errorIssue = Object.keys(issue).map(e => {
        return {
            path: e,
            message: `'${issue[e]}' - this value is already excised`
        }
    })
    response.issue = errorIssue

    return response
}