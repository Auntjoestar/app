import { describe, expect, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import "dotenv/config";
import { app } from "../../src/app";

const api = treaty(app);

describe("GET /characters when empty table", () => {
  it("Returns an empty array if the characters table is empty ", async () => {
    const { data } = await api.characters.get();

    expect(data).toBeEmpty();
  });
});

describe("POST /characters", () => {
  it("Returns 201 status and created message", async () => {
    const { data, status } = await api.characters.post({
      name: "John",
      alias: "The Brave",
      category: "Warrior",
      weapon: "Sword",
    });

    expect(status).toBe(201);
    expect(data).toEqual({
      message: "Character created",
      character: {
        name: "John",
        alias: "The Brave",
        category: "Warrior",
        weapon: "Sword",
      },
    });
  });
});

describe("GET /characters", () => {
  it("Returns an array of characters", async () => {
    const { data } = await api.characters.get();

    expect(data).toEqual([
      {
        id: 1,
        name: "John",
        alias: "The Brave",
        category: "Warrior",
        weapon: "Sword",
      },
    ]);
  });
});

describe("GET /characters/:id", () => {
  it("Return 200 and character", async () => {
    const { data, status } = await api.characters({ id: 1 }).get();

    expect(status).toBe(200);
    expect(data).toEqual({
      id: 1,
      name: "John",
      alias: "The Brave",
      category: "Warrior",
      weapon: "Sword",
    });
  });
});

describe("GET /characters/:id with a non existen character", () => {
  it("Return 404 and message", async () => {
    const { error } = await api.characters({ id: 2 }).get();

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Character Not Found");
  });
});

describe("PUT /characters/:id", () => {
  it("Returns 204 and message", async () => {
    const { status } = await api.characters({ id: 1 }).put({
      name: "Johny",
      alias: "The Great",
      category: "Warrior",
      weapon: "Big Sword",
    });

    expect(status).toBe(204);
  });
});

describe("GET /characters/:id after UPDATE", () => {
  it("Return 200 and character", async () => {
    const { data, status } = await api.characters({ id: 1 }).get();

    expect(status).toBe(200);
    expect(data).toEqual({
      id: 1,
      name: "Johny",
      alias: "The Great",
      category: "Warrior",
      weapon: "Big Sword",
    });
  });
});

describe("PUT /characters/:id with non-existent character", () => {
  it("Returns 404 and message", async () => {
    const { error } = await api.characters({ id: 2 }).put({
      name: "Johny",
      alias: "The Great",
      category: "Warrior",
      weapon: "Big Sword",
    });

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Character Not Found");
  });
});

describe("DELETE /characters/:id", () => {
  it("Returns 204 and message", async () => {
    const { status } = await api.characters({ id: 1 }).delete();

    expect(status).toBe(204);
  });
});

describe("GET /characters/:id after DELETE", () => {
  it("Return 404 and message", async () => {
    const { error } = await api.characters({ id: 1 }).get();

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Character Not Found");
  });
});

describe("DELETE /characters/:id with non-existent character", () => {
  it("Returns 404 and message", async () => {
    const { error } = await api.characters({ id: 2 }).delete();

    expect(error?.status).toBe(404);
    expect(error?.value).toEqual("Character Not Found");
  });
});
