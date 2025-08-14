import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const charactersTable = sqliteTable("characters_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  alias: text("alias").notNull(),
  category: text("category").notNull(),
  weapon: text("weapon").notNull(),
});

export const abilitiesTable = sqliteTable("abilities_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: int("duration").notNull(),
  cooldown: int("cooldown").notNull(),
  characterId: int("character_id").references(() => charactersTable.id),
});
