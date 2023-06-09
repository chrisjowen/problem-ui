import RestApi from "./common/restApi";

class SolutionApi extends RestApi {
    constructor() {
        super('/api/solution');
    }

    comments(solutionId: string) {
        return new RestApi(`/api/solution/${solutionId}/comment`);
    }

    discussion(solutionId: string) {
        return new RestApi(`/api/solution/${solutionId}/discussion`);
    }
}

export default new SolutionApi();