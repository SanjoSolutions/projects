import { modelSaveApi } from "./api/model/modelSaveApi";
import { createHttpServer } from "./createHttpServer";

const httpServer = createHttpServer({
  "/model/save": modelSaveApi,
});
