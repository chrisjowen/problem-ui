import RestApi from "./common/restApi";



class AnswerApi extends RestApi {
    constructor(discussionId: string) {
        super(`/api/discussion/${discussionId}/answer`);
    }
    comments(answerId: string) {
        return new RestApi(`${this.path}/${answerId}/comment`);
    }
}


class DiscussionApi extends RestApi {
    constructor() {
        super('/api/discussion');
    }

    answer(discussionId: string) {
        return new AnswerApi(discussionId);
    }
    comments(discussionId: string) {
        return new RestApi(`/api/discussion/${discussionId}/comment`);
    }
}

export default new DiscussionApi();