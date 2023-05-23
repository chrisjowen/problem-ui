import axios from "axios";

class UserApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "/api/user";
    }

    get(id: string, preloads : string[] = []) {
        return axios.get(`${this.baseUrl}/${id}?preloads=${preloads.join(',')}`)
    }
}

export default new UserApi();