import Elysia from "elysia";
import paramsSchema from "../../schema/characters/paramsSchema";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { getAbilitiesByIdHanlder } from "../../handlers/characters/get";

const characterAbilities = new Elysia({
  prefix: "/characters/:id/abilities",
}).get(
  "",
  ({
    db,
    params,
  }: {
    db: LibSQLDatabase;
    params: typeof paramsSchema.static;
  }) => {
    return getAbilitiesByIdHanlder(db, params);
  },
  {
    params: paramsSchema,
  },
);

export default characterAbilities;
