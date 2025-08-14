import Elysia from "elysia";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { getByIdHanlder, getHandler } from "../../handlers/abilities/get";
import bodySchema from "../../schema/abilities/bodySchema";
import { postHandler } from "../../handlers/abilities/post";
import paramsSchema from "../../schema/characters/paramsSchema";

const abilities = new Elysia({ prefix: "/abilities" })
  .get("", async ({ db }: { db: LibSQLDatabase }) => {
    return getHandler(db);
  })
  .get(
    "/:id",
    async ({
      db,
      params,
    }: {
      db: LibSQLDatabase;
      params: typeof paramsSchema.static;
    }) => {
      return getByIdHanlder(db, params);
    },
    {
      params: paramsSchema,
    },
  )
  .post(
    "",
    async ({
      db,
      body,
    }: {
      db: LibSQLDatabase;
      body: typeof bodySchema.static;
    }) => {
      return postHandler(db, body);
    },
    {
      body: bodySchema,
    },
  );

export default abilities;
