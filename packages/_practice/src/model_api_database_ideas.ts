export {}

class Model {}

class MongoDB {
  get(id: string): any {}

  save(state: any): void {}
}

{
  function api(id: string) {
    const mongoDB = new MongoDB()
    const modelState = mongoDB.get(id)
    const newModelState = businessLogic(modelState)
    mongoDB.save(newModelState)
    const response = {}
    return response
  }

  function businessLogic(modelState: any) {
    const newModelState = {}
    return newModelState
  }
}

// ---

{
  function api(): any {
    const id = '1'
    businessLogic(id)
    const response = {}
    return response
  }

  class PostgreSQL {
    get(id: string): any {}

    save(state: any): void {}
  }

  const postgreSQL = new PostgreSQL()

  class ModelRepository {
    get(id: string): any {
      return postgreSQL.get(id)
    }

    save(modelState: any) {
      postgreSQL.save(modelState)
    }
  }

  const modelRepository = new ModelRepository()

  function businessLogic(id: string) {
    const modelState = modelRepository.get(id)
    const newModelState = businessLogic(modelState)
    modelRepository.save(newModelState)
  }

  function sortDescending<T>(array: T[], getter: (value: any) => any): T[] {
    // TODO: Implement
    return array
  }

  class Debate {
    public positions: any[] = []

    getMostPopularPositions() {
      return sortDescending(this.positions, ({ views }) => views).slice(0, 5)
      // return _.chain(this.position).sortBy(…).reverse().take(5).value()
      // _(…).lodashFunction().lodashFunction()….value()
    }
  }
}
