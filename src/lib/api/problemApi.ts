import type { Discussion, Problem, Vote } from "$lib/types";
import RestApi, { UntypedRestApi } from "./common/restApi";

class CommentsApi extends UntypedRestApi {
    constructor(id: string) {
        super(`/api/problem/${id}/comment`);
    }
}

class DiscussionApi extends RestApi<Discussion> {
    constructor(id: string) {
        super(`/api/problem/${id}/discussion`);
    }
}

class ProblemApi extends RestApi<Problem> {

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

    feed(id: string) {
        return new RestApi(`/api/problem/${id}/feed`);
    }

    obstacles(id: string) {
        return new RestApi(`/api/problem/${id}/obstacle`);
    }
    sectors(id: String) {
        return new RestApi(`/api/problem/${id}/sector`);
    }

    stakeholders(id: String) {
        return new RestApi(`/api/problem/${id}/stakeholder`);
    }

    products(id: String) {
        return new RestApi(`/api/problem/${id}/product`);
    }
    votes(id: String) {
        return new RestApi<Vote>(`/api/problem/${id}/vote`);
    }

    members(id: String) {
        return new RestApi(`/api/problem/${id}/member`);
    }
    pages(id: string) {
        return new RestApi(`/api/problem/${id}/page`);
    }
    invites(id: string) {
        return new RestApi(`/api/problem/${id}/invite`);
    }
    contributionRequests(id: string) {
        return new RestApi(`/api/problem/${id}/contibute_request`);
    }

    precheck(statement: string, sector: string) {
        return this.client.post(`/precheck`, { statement, sector })
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

    addMember(problemId: string, memberId: string) {
        return this.client.post(`/${problemId}/member/${memberId}`)
    }


}

export default new ProblemApi();