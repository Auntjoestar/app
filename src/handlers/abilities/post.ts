import { LibSQLDatabase } from "drizzle-orm/libsql";
import bodySchema from "../../schema/abilities/bodySchema";
import { abilitiesTable, charactersTable } from "../../db/schema";
import { status } from "elysia";
import { eq } from "drizzle-orm";

export async function postHandler(
  db: LibSQLDatabase,
  body: typeof bodySchema.static,
) {
  const ability: typeof abilitiesTable.$inferInsert = {
    name: body.name!,
    description: body.description!,
    duration: body.duration!,
    cooldown: body.cooldown!,
    characterId: body.characterId!,
  };

  if (ability.characterId == null) {
    return status(400, "Character ID is required");
  }

  const character = await db
    .select()
    .from(charactersTable)
    .where(eq(charactersTable.id, ability.characterId))
    .limit(1);

  if (!character[0]) {
    return status(404, "Character Not Found");
  }
  await db.insert(abilitiesTable).values(ability);

  return status(201, {
    message: "Ability Created",
    ability: body,
  });
}
