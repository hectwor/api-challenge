import filmController from "../src/controllers/film.controller";
import * as GETDynamo from "../src/utils/dynamo/get";
import * as SWAPIProvider from "../src/providers/swapi.provider";
import { buildBaseRequest } from "./mock/base-request";
import { translated } from "./mock/translate";
import { allFilms } from "./mock/films";
import { FilmsTranslated } from "./mock/filmsTranslated";

jest.mock("../src/utils/dynamo/get");
jest.mock("../src/providers/swapi.provider");

describe("Film", () => {
  it("Get Films", async () => {
    (GETDynamo.getAllKeys as jest.Mock).mockResolvedValue({ Items: translated });
    (SWAPIProvider.getAllFilms as jest.Mock).mockResolvedValue(allFilms);
    const response = await filmController.getFilms(buildBaseRequest({}, {}, "GET"));
    expect(response).toEqual({ body: JSON.stringify(FilmsTranslated), statusCode: 200 });
  });

  it("Get Films error", async () => {
    (GETDynamo.getAllKeys as jest.Mock).mockRejectedValue({ message: "ERROR", status: 500 });
    const response = await filmController.getFilms(buildBaseRequest({}, {}, "GET"));
    expect(response).toEqual({ body: JSON.stringify({ message: "ERROR" }), statusCode: 500 });
  });
});
