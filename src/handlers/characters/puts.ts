import { LibSQLDatabase } from "drizzle-orm/libsql";
import { charactersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { status } from "elysia";
import bodySchema from "../../schema/characters/bodySchema";
import paramsSchema from "../../schema/characters/paramsSchema";

export async function putHanlder(
  db: LibSQLDatabase,
  params: typeof paramsSchema.static,
  body: typeof bodySchema.static,
) {
  const id = params.id;
  const character = await db
    .select()
    .from(charactersTable)
    .where(eq(charactersTable.id, id))
    .limit(1);

  if (!character[0]) {
    return status(404, "Character Not Found");
  }

  const newCharacterInfo: typeof charactersTable.$inferInsert = {
    name: body.name,
    alias: body.alias,
    category: body.category,
    weapon: body.weapon,
  };

  await db
    .update(charactersTable)
    .set(newCharacterInfo)
    .where(eq(charactersTable.id, id));

  return status(204);
}
