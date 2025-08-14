import { LibSQLDatabase } from "drizzle-orm/libsql";
import { charactersTable } from "../../db/schema";
import { status } from "elysia";
import bodySchema from "../../schema/characters/bodySchema";

export async function postHandler(
  db: LibSQLDatabase,
  body: typeof bodySchema.static,
) {
  const character: typeof charactersTable.$inferInsert = {
    name: body.name,
    alias: body.alias,
    category: body.category,
    weapon: body.weapon,
  };

  await db.insert(charactersTable).values(character);
  return status(201, {
    message: "Character created",
    character: body,
  });
}
