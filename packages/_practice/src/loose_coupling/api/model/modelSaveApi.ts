import { database } from "../../database.js";
import { deserialize } from "../../deserialize.js";
import { Model } from "../../Model.js";

export function modelSaveApi(request: { body: string }) {
  const data = deserialize(request.body);
  const model = new Model(data);
  database.save(model);
}
