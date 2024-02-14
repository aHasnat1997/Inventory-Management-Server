import { NextFunction, Request, Response } from "express";
import handleAsyncReq from "./handelAsyncReq";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { HTTPStatusCode } from "../utils/httpCode";
import { UserModel } from "../modules/users/user.model";
import { TUserRole } from "../modules/users/user.interface";

/**
 * auth guard middlewares
 * @param roles user access role
 * @returns async function
*/
type TRoles = TUserRole.buyer | TUserRole.seller | TUserRole.superAdmin;
export const authGuard = (...roles: TRoles[]) => {
    return handleAsyncReq(async (req: Request, res: Response, next: NextFunction) => {
        // const token = req.cookies.accessToken;
        const token = req.headers.authorization as string;
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const user = await UserModel.findOne({ email: decoded.email });

        if (!token || !decoded) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Unauthorized...');
        } else if (roles && !roles.includes(decoded?.role)) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Role Unauthorized...');
        } else if (!user) {
            throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
        } else if (!user.isActive) {
            throw new AppError(HTTPStatusCode.NotFound, 'This user is not active!');
        }

        req.user = user;
        next();
    });
};