import RestApi from "./common/restApi";

class CommentsApi extends RestApi {
    constructor(id: string) {
        super(`/api/problem/${id}/comment`);
    }
}

class DiscussionApi extends RestApi {
    constructor(id: string) {
        super(`/api/problem/${id}/discussion`);
    }
}


class ProblemApi extends RestApi {

    constructor() {
        super('/api/problem');
    }


    comments(id: string) {
        return new CommentsApi(id);
    }

    discussion(id: string) {
        return new DiscussionApi(id);
    }

    links(id: string) {
        return new RestApi(`/api/problem/${id}/link`);
    }

    sectors(id: String) {
        return new RestApi(`/api/problem/${id}/sector`);
    }

    precheck(statement: string, sector: string) {
        return this.client.post(`/precheck`, { statement,  sector })
    }
    solutions(id: string, preloads: string[]) {
        return this.client.get(`/${id}/solution?preloads=${preloads.join(',')}`)
    }

    submit(problemStatement: string, traceId: string, sectorId: number) {
        return this.client.post(`/submit`, {
            problem: problemStatement,
            identifer: traceId,
            sector_id: sectorId
        })
    }

    follow(problemId: string) {
        return this.client.post(`/${problemId}/follow`)
    }

    unfollow(problemId: string) {
        return this.client.post(`/${problemId}/unfollow`)
    }

    template(args: any) {
        return this.client.post(`/template`, args)
    }


}

export default new ProblemApi();