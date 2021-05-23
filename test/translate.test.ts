import { allFilms } from "./mock/films";
import { FilmsTranslated } from "./mock/filmsTranslated";
import { translated } from "./mock/translate";
import { toTranslate, toTranslateOnlyObject } from "../src/utils/translate";

describe("Translate", () => {
  it("Full object", async () => {
    expect(toTranslate(allFilms, translated)).toEqual(FilmsTranslated);
  });

  it("Object", async () => {
    expect(toTranslateOnlyObject({ count: 1 }, translated)).toEqual({ Cantidad: 1 });
  });
});
