import config from "../config";
import { TUser, TUserRole } from "../modules/users/user.interface";
import { UserModel } from "../modules/users/user.model";

const superAdminData: TUser = {
  username: {
    firstName: 'Kodu',
    lastName: 'Azad'
  },
  email: 'kodu@azad.com',
  password: config.super_pass as string,
  phone: '+90687-5655',
  role: TUserRole.superAdmin,
  isActive: true,
  userImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjEsNzCONQFHfnFZuMTmMC22dKcAb1if-7VpTZEqeLb5CGZ6RxXIF2UjfKJtVcjUjcaPo&usqp=CAU'
}

export default async function seedSuperAdmin() {
  const hasSuperAdmin = await UserModel.findOne({ role: TUserRole.superAdmin })
  if (!hasSuperAdmin) {
    await UserModel.create(superAdminData);
  }
}