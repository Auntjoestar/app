import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { charactersTable } from "../../src/db/schema";

export async function seedDB(db: BunSQLiteDatabase) {
  const character: typeof charactersTable.$inferInsert = {
    name: "Connie",
    alias: "Super mega papu pro",
    category: "Warrior",
    weapon: "Ak-47",
  };

  await db.insert(charactersTable).values(character);
  console.log("User inserted into db");
  console.log("Database seeded...");
}
