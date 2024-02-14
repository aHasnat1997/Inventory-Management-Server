// import { ObjectId } from "mongoose"
import { TUserRole } from "../modules/users/user.interface"

export type TJwtPayload = {
  email: string,
  role: TUserRole.superAdmin | TUserRole.seller | TUserRole.buyer
}