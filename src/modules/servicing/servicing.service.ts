import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { UserModel } from "../users/user.model";
import { TServicing } from "./servicing.interface";
import { ServicingModel } from "./servicing.model";

/**
 * User can cerate a servicing in DB
 * @param payload servicing data
 * @returns servicing cerated data
 */
const CerateServicing = async (payload: TServicing) => {
  const hasUser = await UserModel.findById(payload.userId)
  if (!hasUser) {
    throw new AppError(HTTPStatusCode.NotFound, 'User not found...')
  } else if (hasUser && !hasUser.isActive) {
    throw new AppError(HTTPStatusCode.NotFound, 'User not active...')
  } else {
    const result = await ServicingModel.create(payload)
    return result
  }
};

/**
 * Get all servicing data from DB
 * @returns All Servicing data
 */
const GetAllServicing = async () => {
  const servicingQuery = new QueryBuilder(
    ServicingModel.find()
  )
    .sort()
    .paginate();

  const result = await servicingQuery.modelQuery;
  const meta = await servicingQuery.countTotal();
  return { result, meta }
};

/**
 * Get a single user data
 * @param userId user id
 * @returns user servicing data
 */
const GetUserServicing = async (userId: string) => {
  const servicingQuery = new QueryBuilder(
    ServicingModel.find({ userId })
  )
    .sort()
    .paginate();

  const result = await servicingQuery.modelQuery;
  const meta = await servicingQuery.countTotal();
  return { result, meta }
};

export const ServicingService = {
  CerateServicing,
  GetAllServicing,
  GetUserServicing
}