class Model {}

class MongoDB {}

function api(id) {
  const modelState = mongoDB.get(id);
  const newModelState = businessLogic(modelState);
  mongoDB.save(newModelState);
  const response = {};
  return response;
}

function businessLogic(modelState) {
  return newModelState;
}

// ---

function api() {
  businessLogic(id);
  return response;
}

class ModelRepository {
  get(id) {
    return postgreSQL.get(id);
  }

  save(modelState) {
    postgreSQL.save(modelState);
  }
}

function businessLogic(id) {
  const modelState = modelRepository.get(id);
  const newModelState = businessLogic(modelState);
  modelRepository.save(newModelState);
}

class Debate {
  constructor() {
    this.positions = [];
  }

  getMostPopularPositions() {
    return sortDescending(this.positions, ({ views }) => views).slice(0, 5);
    // return _.chain(this.position).sortBy(…).reverse().take(5).value()
    // _(…).lodashFunction().lodashFunction()….value()
  }
}
