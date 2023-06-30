import RestApi from "./common/restApi";

class IdeaApi extends RestApi {
    constructor() {
        super('/api/idea');
    }
    comments(id: String) {
        return new RestApi(`${this.path}/${id}/comment`);
    }
    votes(id: String) {
        return new RestApi(`${this.path}/${id}/vote`);
    }
}

export default new IdeaApi();