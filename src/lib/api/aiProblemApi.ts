import RestApi from "./common/restApi";


class AiProblemApi extends RestApi {

    constructor() {
        super('/api/ai/problem');
    }


    precheck(statement: string, sector: string) {
        return this.client.post(`/precheck`, { statement,  sector })
    }
}

export default new AiProblemApi();