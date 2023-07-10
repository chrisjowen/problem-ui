import type { Discussion } from "$lib/types";
import RestApi, { UntypedRestApi } from "./common/restApi";

class SolutionApi extends UntypedRestApi {
    constructor() {
        super('/api/solution');
    }

    comments(solutionId: string) {
        return new UntypedRestApi(`/api/solution/${solutionId}/comment`);
    }

    discussion(solutionId: string) {
        return new RestApi<Discussion>(`/api/solution/${solutionId}/discussion`);
    }
}

export default new SolutionApi();