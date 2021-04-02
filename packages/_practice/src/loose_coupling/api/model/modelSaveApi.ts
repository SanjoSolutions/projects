import { database } from "../../database"
import { deserialize } from "../../deserialize"
import { Model } from "../../Model"

export function modelSaveApi(request: { body: string }) {
  const data = deserialize(request.body)
  const model = new Model(data)
  database.save(model)
}
