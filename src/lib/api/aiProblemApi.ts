import RestApi from "./common/restApi";


class AiProblemApi extends RestApi {
    constructor() {
        super('/api/ai/problem');
    }

    precheck(statement: string) {
        return this.client.post(`/precheck`, { statement })
    }
}

export default new AiProblemApi();