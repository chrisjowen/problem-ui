import RestApi from "./common/restApi";


class AnswerApi extends RestApi {
    constructor() {
        super('/api/answer');
    }

    comments(id: string) {
        return new RestApi(`${this.path}/${id}/comment`);
    }
}

export default new AnswerApi();