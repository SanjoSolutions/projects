class Model {
}
class MongoDB {
    get(id) {
    }
    save(state) {
    }
}
{
    function api(id) {
        const mongoDB = new MongoDB();
        const modelState = mongoDB.get(id);
        const newModelState = businessLogic(modelState);
        mongoDB.save(newModelState);
        const response = {};
        return response;
    }
    function businessLogic(modelState) {
        const newModelState = {};
        return newModelState;
    }
}
// ---
{
    function api() {
        const id = '1';
        businessLogic(id);
        const response = {};
        return response;
    }
    class PostgreSQL {
        get(id) {
        }
        save(state) {
        }
    }
    const postgreSQL = new PostgreSQL();
    class ModelRepository {
        get(id) {
            return postgreSQL.get(id);
        }
        save(modelState) {
            postgreSQL.save(modelState);
        }
    }
    const modelRepository = new ModelRepository();
    function businessLogic(id) {
        const modelState = modelRepository.get(id);
        const newModelState = businessLogic(modelState);
        modelRepository.save(newModelState);
    }
    function sortDescending(array, getter) {
        // TODO: Implement
        return array;
    }
    class Debate {
        positions = [];
        getMostPopularPositions() {
            return sortDescending(this.positions, ({ views }) => views).slice(0, 5);
            // return _.chain(this.position).sortBy(…).reverse().take(5).value()
            // _(…).lodashFunction().lodashFunction()….value()
        }
    }
}
export {};
//# sourceMappingURL=model_api_database_ideas.js.map