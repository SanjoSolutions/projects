jest.mock("../../database")

import { database } from "../../database"
import { serialize } from "../../serialize"
import { modelSaveApi } from "./modelSaveApi"

describe("modelSaveApi", () => {
  it("saves the data from the request.body to the database", () => {
    const request = {
      body: serialize({ a: 1 }),
    }
    modelSaveApi(request)
    expect(database.find()).toEqual([{ a: 1 }])
  })
})
