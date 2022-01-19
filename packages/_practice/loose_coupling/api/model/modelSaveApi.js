import { database } from '../../database.js';
import { deserialize } from '../../deserialize.js';
import { Model } from '../../Model.js';
export function modelSaveApi(request) {
    const data = deserialize(request.body);
    const model = new Model(data);
    database.save(model);
}
//# sourceMappingURL=modelSaveApi.js.map