import { Elysia } from "elysia";
import { Logestic } from "logestic";
import swagger from "@elysiajs/swagger";
import characters from "./routers/characters/characters";
import abilities from "./routers/abilities/abilities";
import characterAbilities from "./routers/characters/charactersAbilities";
import { initDB } from "./db/init";

export const db = initDB();

export const app = new Elysia()
  .use(Logestic.preset("common"))
  .use(swagger())
  .decorate("db", db)
  .use(characters)
  .use(abilities)
  .use(characterAbilities);

export type App = typeof app;
