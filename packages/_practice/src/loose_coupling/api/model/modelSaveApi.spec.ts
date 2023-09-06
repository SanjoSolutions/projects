import { describe, expect, it, jest } from "@jest/globals"
import { database } from "../../database.js"
import { serialize } from "../../serialize.js"
import { modelSaveApi } from "./modelSaveApi.js"

jest.mock("../../database")

describe("modelSaveApi", () => {
  it("saves the data from the request.body to the database", () => {
    const request = {
      body: serialize({ a: 1 }),
    }
    modelSaveApi(request)
    expect(database.find()).toEqual([{ a: 1 }])
  })
})
