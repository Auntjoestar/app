import { LibSQLDatabase } from "drizzle-orm/libsql";
import { getByIdHandler, getHanlder } from "../../handlers/characters/get";
import { postHandler } from "../../handlers/characters/post";
import bodySchema from "../../schema/characters/bodySchema";
import { putHanlder } from "../../handlers/characters/puts";
import paramsSchema from "../../schema/characters/paramsSchema";
import { deleteHandler } from "../../handlers/characters/delete";
import Elysia from "elysia";

const characters = new Elysia({ prefix: "/characters" })
  .get("", ({ db }: { db: LibSQLDatabase }) => {
    return getHanlder(db);
  })
  .get(
    "/:id",
    ({
      db,
      params,
    }: {
      db: LibSQLDatabase;
      params: typeof paramsSchema.static;
    }) => {
      return getByIdHandler(db, params);
    },
    {
      params: paramsSchema,
    },
  )
  .post(
    "",
    ({ db, body }: { db: LibSQLDatabase; body: typeof bodySchema.static }) => {
      return postHandler(db, body);
    },
    {
      body: bodySchema,
    },
  )
  .put(
    "/:id",
    ({
      db,
      params,
      body,
    }: {
      db: LibSQLDatabase;
      params: typeof paramsSchema.static;
      body: typeof bodySchema.static;
    }) => {
      return putHanlder(db, params, body);
    },
    {
      params: paramsSchema,
    },
  )
  .delete(
    "/:id",
    ({
      db,
      params,
    }: {
      db: LibSQLDatabase;
      params: typeof paramsSchema.static;
    }) => {
      return deleteHandler(db, params);
    },
    {
      params: paramsSchema,
    },
  );
export default characters;
