import path from "node:path";
import tomlJson from "toml-json";
import { readdirSync, statSync } from "node:fs";
import { treaty } from "@elysiajs/eden";
import { App } from "../src/app";

const api = treaty<App>("https://pericojuegos-api.onrender.com/");

// Define a type for parsed TOML data
type TomlData = Record<string, any>;

interface ParsedFile {
  file: string;
  data: TomlData;
}

interface Character {
  name: string;
  alias: string;
  category: string;
  weapon: string;
  ability: Ability;
}

interface Ability {
  name: string;
  description: string;
  duration: number;
  cooldown: number;
  characterName: string;
}

// Recursively get all files from a directory
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      getAllFiles(fullPath, fileList); // recurse into subdirectory
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function getData() {
  // Path to your content folder
  const contentDir = path.resolve("./src/content");
  const allFiles = getAllFiles(contentDir);

  // Filter for TOML files and parse them
  const jsonData: ParsedFile[] = allFiles.map((file) => ({
    file,
    data: tomlJson({ fileUrl: file }) as TomlData,
  }));

  return jsonData;
}

function getCharacters(characters: TomlData) {
  return characters.map((c: Character) => {
    return {
      name: c.name,
      alias: c.alias,
      category: c.category,
      weapon: c.weapon,
    };
  });
}

function getAbilities(characters: TomlData[]) {
  return characters
    .filter((c: any) => c.ability !== undefined)
    .map((c: any) => {
      return {
        ...c.ability,
        characterName: c.name,
      };
    });
}

const jsonData = getData();

const charactersData = jsonData
  .filter((c) => Object.keys(c.data).length !== 0)
  .map((c) => c.data);

const characters = getCharacters(charactersData);

const abilities = getAbilities(charactersData);

for (const c of characters) {
  await api.characters.post({ ...c });
}

const { data } = await api.characters.get();

for (const ability of abilities) {
  const character = data!.find(
    (c: Character) => c.name === ability.characterName,
  );
  if (character) {
    await api.abilities.post({
      name: ability.name,
      description: ability.description,
      duration: parseInt(ability.duration),
      cooldown: parseInt(ability.cooldown),
      characterId: character.id,
    });
  }
}
