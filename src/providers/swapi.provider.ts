import axios from "axios";
import { Films } from "../interfaces/swapi/film.interface";

const baseURL = process.env.SWAPI;

const swapi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getAllFilms = async (): Promise<Films> => {
  const { data } = await swapi.get("/films");
  return data;
};
