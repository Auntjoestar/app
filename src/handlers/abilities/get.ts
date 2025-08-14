import { LibSQLDatabase } from "drizzle-orm/libsql";
import { abilitiesTable } from "../../db/schema";
import paramsSchema from "../../schema/characters/paramsSchema";
import { eq } from "drizzle-orm";
import { status } from "elysia";

export async function getHandler(db: LibSQLDatabase) {
  const abilities = await db.select().from(abilitiesTable);

  return abilities;
}

export async function getByIdHanlder(
  db: LibSQLDatabase,
  params: typeof paramsSchema.static,
) {
  const id = params.id;
  const ability = await db
    .select()
    .from(abilitiesTable)
    .where(eq(abilitiesTable.id, id))
    .limit(1);

  if (!ability[0]) {
    return status(404, "Ability Not Found");
  }

  return ability[0];
}
