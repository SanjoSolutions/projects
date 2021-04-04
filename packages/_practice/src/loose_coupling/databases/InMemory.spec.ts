import { InMemory } from "./InMemory.js";

describe("InMemory", () => {
  let database;
  beforeEach(() => {
    database = new InMemory();
  });

  it("returns data as JavaScript objects", () => {
    database.save({ a: 1 });
    expect(database.find()).toEqual([{ a: 1 }]);
  });
});
