import { getAllFilms } from "../src/providers/swapi.provider";
import { allFilms } from "./mock/films";

describe("SWAPI", () => {
  it("Get Films", async () => {
    const response = await getAllFilms();
    expect(response).toEqual(allFilms);
  });
});
