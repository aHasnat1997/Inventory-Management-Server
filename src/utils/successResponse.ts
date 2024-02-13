import { Response } from "express";
import { TSuccessResponse } from "../interfaces/successResponse";

/**
 * Handle all success response
 * @param res express response
 * @param data response data
 * @param statusCode HTTP status code
 */
const successResponse = <T>(res: Response, data: TSuccessResponse<T>, statusCode?: number): void => {
    res.status(statusCode || 200).json({
        'success': true,
        'message': data.message,
        'meta': data.meta,
        'doc': data.doc
    });
}

export default successResponse;