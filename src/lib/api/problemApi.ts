import axios from "axios";

class ProblemApi {
    constructor() {
        console.log('Problem');
    }

    follow(problemId: string) {
        return axios.post(`/api/problem/${problemId}/follow`)
    }

    sectors(query: string = "", page: number = 1, pageSize: number = 50) {
        return axios.get('/api/sector')
    }

    problems(query: string = "", page: number = 1, pageSize: number = 50) {
        return axios.get(`/api/problem?q=${query}`)
    }
}

export default new ProblemApi();