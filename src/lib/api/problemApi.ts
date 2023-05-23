import axios from "axios";

class ProblemApi {

    constructor() {
        console.log('Problem');
    }

    update(problemId: string, params: any) {
        return axios.put(`/api/problem/${problemId}`, params)
    }

    solutions(id: string, preloads: string[]) {
        return axios.get(`/api/problem/${id}/solution?preloads=${preloads.join(',')}`)
    }

    submit(problemStatement: string, traceId: string, sectorId: number) {
        return axios.post(`/api/problem/submit`, {
            problem: problemStatement,
            identifer: traceId,
            sector_id: sectorId
        })
    }

    get(id: string, preloads: string[] = []) {
        return axios.get(`/api/problem/${id}?preloads=${preloads.join(',')}`)
    }

    follow(problemId: string) {
        return axios.post(`/api/problem/${problemId}/follow`)
    }

    unfollow(problemId: string) {
        return axios.post(`/api/problem/${problemId}/unfollow`)
    }

    sectors(query: string = "", page: number = 1, pageSize: number = 50) {
        return axios.get('/api/sector')
    }

    problems(query: string = "", page: number = 1, pageSize: number = 50) {
        return axios.get(`/api/problem?q=${query}`)
    }
}

export default new ProblemApi();