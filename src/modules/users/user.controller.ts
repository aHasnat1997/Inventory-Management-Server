import { Request, Response } from "express";
import handelAsyncReq from "../../middlewares/handelAsyncReq";
import { UserService } from "./user.service";
import { HTTPStatusCode } from "../../utils/httpCode";
import successResponse from "../../utils/successResponse";

/**
 * register user
 */
const Registration = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await UserService.UserRegistration(req.body);
  successResponse(res, {
    message: 'User registered successfully',
    doc: result
  }, HTTPStatusCode.Created)
});

/**
 * user login
 */
const Login = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await UserService.UserLogin(req.body);
  res.cookie('refreshToken', result.refreshToken, { httpOnly: true });
  successResponse(res, {
    message: 'User login successful',
    doc: {
      user: result.user,
      token: {
        access: result.accessToken,
      }
    }
  })
});

/**
 * Logout user and clear cookie
 */
const LogOut = handelAsyncReq(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { httpOnly: true });
  successResponse(res, {
    message: 'User logout successful',
    doc: {}
  })
});

/**
 * user new access token
 */
const NewAccessToken = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
  const result = await UserService.RefreshAccessToken(req?.cookies?.refreshToken);
  successResponse(res, {
    message: 'Token refresh successfully!',
    doc: {
      newAccessToken: result.accessToken
    }
  });
});

export const UserController = {
  Registration,
  Login,
  LogOut,
  NewAccessToken
}
