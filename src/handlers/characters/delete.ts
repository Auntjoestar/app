import { LibSQLDatabase } from "drizzle-orm/libsql";
import paramsSchema from "../../schema/characters/paramsSchema";
import { charactersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { status } from "elysia";

export async function deleteHandler(
  db: LibSQLDatabase,
  params: typeof paramsSchema.static,
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

  await db.delete(charactersTable).where(eq(charactersTable.id, id));
  return status(204);
}
