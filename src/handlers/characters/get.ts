import { LibSQLDatabase } from "drizzle-orm/libsql";
import { abilitiesTable, charactersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { status } from "elysia";
import paramsSchema from "../../schema/characters/paramsSchema";

export async function getHanlder(db: LibSQLDatabase) {
  const characters = await db.select().from(charactersTable);
  return characters;
}

export async function getByIdHandler(
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

  return { ...character[0] };
}

export async function getAbilitiesByIdHanlder(
  db: LibSQLDatabase,
  params: typeof paramsSchema.static,
) {
  const id = params.id;
  const result = await db
    .select({
      characterId: charactersTable.id,
    })
    .from(charactersTable)
    .where(eq(charactersTable.id, id))
    .limit(1);

  if (!result[0]) {
    return status(404, "Character Not Found");
  }

  const abilities = await db
    .select()
    .from(abilitiesTable)
    .where(eq(abilitiesTable.characterId, result[0].characterId));

  return abilities.map((a) => ({ ...a }));
}
