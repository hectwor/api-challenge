import keyController from "../src/controllers/key.controller";
import { buildBaseRequest } from "./mock/base-request";
import * as GETDynamo from "../src/utils/dynamo/get";
import * as PUTDynamo from "../src/utils/dynamo/put";
import * as UPDATEDynamo from "../src/utils/dynamo/update";
import { translated } from "./mock/translate";

jest.mock("../src/utils/dynamo/get");
jest.mock("../src/utils/dynamo/put");
jest.mock("../src/utils/dynamo/update");

describe("Keys", () => {
  it("Get keys", async () => {
    (GETDynamo.getAllKeys as jest.Mock).mockResolvedValue({ Items: translated });
    const response = await keyController.getKeys(buildBaseRequest({}, {}, "GET"));
    expect(response).toEqual({
      body: JSON.stringify([
        { original: "count", translated: "Cantidad" },
        { original: "next", translated: "Siguiente" },
        { original: "previous", translated: "Anterior" },
        { original: "results", translated: "resultados" },
        { original: "title", translated: "Título" },
        { original: "episode_id", translated: "Id del episodio" },
        { original: "opening_crawl", translated: "Rastreo de apertura" },
        { original: "director", translated: "Director" },
        { original: "producer", translated: "Productor" },
        { original: "release_date", translated: "Fecha de lanzamiento" },
        { original: "characters", translated: "Personajes" },
        { original: "planets", translated: "Planetas" },
        { original: "starships", translated: "Naves estelares" },
        { original: "vehicles", translated: "Vehiculos" },
        { original: "species", translated: "Especies" },
        { original: "created", translated: "Creado en" },
        { original: "edited", translated: "Editado en" },
        { original: "url", translated: "Dirección electrónica" },
      ]),
      statusCode: 200,
    });
  });

  it("Get keys error", async () => {
    (GETDynamo.getAllKeys as jest.Mock).mockRejectedValue({ message: "ERROR", status: 500 });
    const response = await keyController.getKeys(buildBaseRequest({}, {}, "GET"));
    expect(response).toEqual({ body: JSON.stringify({ message: "ERROR" }), statusCode: 500 });
  });

  it("Post keys body incorrect", async () => {
    const response = await keyController.addKey(buildBaseRequest({ original: "name" }, {}, "POST"));
    expect(response).toEqual({ body: JSON.stringify({ message: "Campo translated es requerido y en texto" }), statusCode: 400 });
  });

  it("Post keys exists", async () => {
    (GETDynamo.getKey as jest.Mock).mockResolvedValue({ Item: translated[0] });
    const response = await keyController.addKey(buildBaseRequest({ original: "name", translated: "Nombre" }, {}, "POST"));
    expect(response).toEqual({ body: JSON.stringify({ message: "Llave ya existe" }), statusCode: 400 });
  });

  it("Post keys success", async () => {
    (GETDynamo.getKey as jest.Mock).mockResolvedValue({});
    (PUTDynamo.putKey as jest.Mock).mockResolvedValue({});
    const response = await keyController.addKey(buildBaseRequest({ original: "name", translated: "Nombre" }, {}, "POST"));
    expect(response).toEqual({ body: JSON.stringify({ message: "Guardado correcto." }), statusCode: 200 });
  });

  it("Put keys", async () => {
    (UPDATEDynamo.updateKey as jest.Mock).mockResolvedValue({});
    const response = await keyController.updateKey(buildBaseRequest({ original: "name", translated: "Nombre" }, {}, "POST"));
    expect(response).toEqual({ body: JSON.stringify({ message: "Actualizado correcto." }), statusCode: 200 });
  });

  it("Put keys body incorrect", async () => {
    const response = await keyController.updateKey(buildBaseRequest({ original: "name" }, {}, "POST"));
    expect(response).toEqual({ body: JSON.stringify({ message: "Campo translated es requerido y en texto" }), statusCode: 400 });
  });
});
