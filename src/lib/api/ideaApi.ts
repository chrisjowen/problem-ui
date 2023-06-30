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
    tags() {
        return this.client.get(`/tags`);
    }
    skills() {
        return this.client.get(`/skills`);
    }
}

export default new IdeaApi();