import { getAllFilms } from "../providers/swapi.provider";
import { toTranslate } from "../utils/translate";
import KeyService from "./key.service";

class FilmService {
  async getFilms() {
    const films = await getAllFilms();
    const keys = await KeyService.getKeys();

    return toTranslate(films, keys);
  }
}
export default new FilmService();
