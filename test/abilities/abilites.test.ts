import { treaty } from "@elysiajs/eden";
import { it, expect, describe, beforeAll, afterAll } from "bun:test";
import { seedDB } from "../../seed/characters/characters";
import { abilitiesTable, charactersTable } from "../../src/db/schema";
import { app, db } from "../../src/app";

const api = treaty(app);

beforeAll(() => {
  seedDB(db);
});

describe("GET /abilities when empty table", () => {
  it("Returns an empty array", async () => {
    const { data } = await api.abilities.get();

    expect(data).toBeEmpty();
  });
});

describe("POST /abilities", () => {
  it("Returns 201 status and created message", async () => {
    const mockAbility = {
      name: "Dormir",
      description: "Como duerme la puta.",
      duration: 1,
      cooldown: 2,
      characterId: 1,
    };

    const { data, status } = await api.abilities.post(mockAbility);

    expect(status).toBe(201);
    expect(data).toEqual({
      message: "Ability Created",
      ability: mockAbility,
    });
  });
});

describe("POST /abilities with non existent character", () => {
  it("Returns 404 status and Character Not Found message", async () => {
    const mockAbility = {
      name: "Dormir",
      description: "Como duerme la puta.",
      duration: 1,
      cooldown: 2,
      characterId: 2,
    };

    const { error } = await api.abilities.post(mockAbility);

    expect(error?.status).toBe(404);
    expect(error?.message).toEqual("Character Not Found");
  });
});

describe("GET /abilities", () => {
  it("Returns array of abilities", async () => {
    const mockAbility = {
      id: 1,
      name: "Dormir",
      description: "Como duerme la puta.",
      duration: 1,
      cooldown: 2,
      characterId: 1,
    };
    const mockArray = [mockAbility];

    const { data } = await api.abilities.get();
    expect(data).toEqual(mockArray);
  });
});

describe("GET /abilities/:id", () => {
  it("Returns 200 and ability", async () => {
    const { status, data } = await api.abilities({ id: 1 }).get();
    const mockAbility = {
      id: 1,
      name: "Dormir",
      description: "Como duerme la puta.",
      duration: 1,
      cooldown: 2,
      characterId: 1,
    };

    expect(status).toBe(200);
    expect(data).toEqual(mockAbility);
  });
});

describe("GET /abilities/:id with non-existent ablity", () => {
  it("Returns 200 and ability", async () => {
    const { error } = await api.abilities({ id: 2 }).get();

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Ability Not Found");
  });
});

describe("GET /characters/:id/abilities", () => {
  it("Returns 200 and abilities array", async () => {
    const { status, data } = await api.characters({ id: 1 }).abilities.get();

    const mockAbility = {
      id: 1,
      name: "Dormir",
      description: "Como duerme la puta.",
      duration: 1,
      cooldown: 2,
      characterId: 1,
    };

    const expectedReponse = [mockAbility];

    expect(status).toBe(200);
    expect(data).toEqual(expectedReponse);
  });
});

describe("GET /characters/:id/abilities with non-existent character", () => {
  it("Returns 404 and Character Not Found", async () => {
    const { error } = await api.characters({ id: 2 }).abilities.get();

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Character Not Found");
  });
});

describe("GET /characters/:id/abilities when there are no abilities", () => {
  it("Returns 200 and empty array", async () => {
    await db.delete(abilitiesTable);

    const { status, data } = await api.characters({ id: 1 }).abilities.get();

    expect(status).toBe(200);
    expect(data).toBeEmpty();
  });
});

afterAll(async () => {
  await db.delete(charactersTable);
});
