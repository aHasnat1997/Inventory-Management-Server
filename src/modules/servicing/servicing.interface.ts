import { ObjectId } from "mongoose"

export type TServicing = {
  userId: ObjectId,
  servicingPart: string,
  issueDescription: string,
  preferredDate: string,
  isServicingDone?: boolean
}