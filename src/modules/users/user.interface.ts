import { Model } from "mongoose";

export type TName = {
  firstName: string,
  lastName: string
};

export type TUser = {
  username: TName,
  email: string,
  phone: string,
  password: string,
  userImg?: string,
  isActive?: boolean
};

export type TUserLogin = {
  email: string,
  password: string,
};

export type TUserStaticMethod = Model<TUser> & {
  isUserPasswordMatched(plainPassword: string, hashedPassword: string): boolean,
};