import { Schema, model } from "mongoose";
import { TName, TUser, TUserRole, TUserStaticMethod } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const UserName = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const UserSchema = new Schema<TUser, TUserStaticMethod>({
  username: { type: UserName, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  userImg: { type: String, default: null },
  role: { type: String, enum: [TUserRole.buyer, TUserRole.seller, TUserRole.superAdmin], default: TUserRole.buyer },
  isActive: { type: Boolean, default: true },
});

/**
 * remove some fields from response JSON
 * @returns resJSON
 */
UserSchema.methods.toJSON = function () {
  const resJSON = this.toObject();
  const removeFields = ['__v', 'password'];
  removeFields.forEach(remove => delete resJSON[remove]);
  return resJSON;
};

/**
* user password hashed and stor in DB
*/
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next()
});

/**
 * method for user password matched or not
 */
UserSchema.static('isUserPasswordMatched', async function isUserPasswordMatched(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
});

export const UserModel = model<TUser, TUserStaticMethod>('user', UserSchema);