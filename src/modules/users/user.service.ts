import config from "../../config";
import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { TUser, TUserLogin } from "./user.interface";
import { UserModel } from "./user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * register user in DB
 * @param payload user data
 * @returns created data
 */
const UserRegistration = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

/**
 * user login service 
 * @param payload login credentials
 * @returns token and user data
 */
const UserLogin = async (payload: TUserLogin) => {
  const user = await UserModel.findOne({ email: payload.email }).select('-createdAt -updatedAt');
  if (!user) {
    throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
  } else if (!(user?.isActive)) {
    throw new AppError(HTTPStatusCode.Forbidden, 'User is not active!');
  } else if (!(await UserModel.isUserPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(HTTPStatusCode.Forbidden, 'Wrong Password');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });
  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in });

  return {
    accessToken,
    refreshToken,
    user
  };
};

/**
 * get new access token
 * @param payload refresh token
 * @returns null
 */
const RefreshAccessToken = async (payload: string) => {
  const decoded = jwt.verify(payload, config.jwt_refresh_secret as string) as JwtPayload;
  const user = await UserModel.findOne({ _id: decoded.id });
  if (!user) {
    throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
  } else if (!(user?.isActive)) {
    throw new AppError(HTTPStatusCode.Forbidden, 'User is not active!');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });
  return {
    accessToken
  };
}

export const UserService = {
  UserRegistration,
  UserLogin,
  RefreshAccessToken
}
