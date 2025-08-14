import { drizzle } from "drizzle-orm/bun-sqlite";

export function initDB() {
  const db = drizzle(":memory:");

  db.run(`
  CREATE TABLE IF NOT EXISTS characters_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    alias TEXT NOT NULL,
    category TEXT NOT NULL,
    weapon TEXT NOT NULL
  );
`);

  db.run(`
  CREATE TABLE IF NOT EXISTS abilities_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL,
    cooldown INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    FOREIGN KEY (character_id) REFERENCES characters_table(id)
  );
`);

  return db;
}

//
// export function initDB() {
//
// const db = drizzle({
//   connection: {
//     url: process.env.TURSO_DATABASE_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN!,
//   },
// });
//
//
//
//   return db;
// }
//
