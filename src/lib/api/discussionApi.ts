import RestApi from "./common/restApi";


class DiscussionApi extends RestApi {
    constructor() {
        super('/api/discussion');
    }

    answer(discussionId: string) {
        return new RestApi(`/api/discussion/${discussionId}/answer`);
    }
}

export default new DiscussionApi();