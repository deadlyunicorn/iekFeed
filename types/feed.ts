import { ObjectId } from "mongodb"

export type feedEntry = {
  _id: ObjectId,
  textContent: string,
  discovery_date: Date
}