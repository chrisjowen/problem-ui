import axios from "axios";
import { PUBLIC_PROBLEM_API_PATH } from '$env/static/public'


class Client {
    protected baseUrl: string = "";
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    get(path: string) {
        return axios.get(`${this.baseUrl}${path}`)
    }
    post(path: string, params: any = {}) {
        return axios.post(`${this.baseUrl}${path}`, params)
    }
    put(path: string, params: any = {}) {
        return axios.put(`${this.baseUrl}${path}`, params)
    }
    delete(path: string) {
        return axios.delete(`${this.baseUrl}${path}`)
    }
}

export default class RestApi {    
    protected client: Client;
    protected baseUrl : string;

    constructor(baseUrl: string) {
        this.baseUrl = `${PUBLIC_PROBLEM_API_PATH}${baseUrl}`;
        // this.baseUrl = `${baseUrl}`;
        this.client = new Client(this.baseUrl);
    }

    update(id: string, params: any) {
        return this.client.put(`/${id}`, params)
    }

    create(params: any) {
        return this.client.post("/", params)
    }

    get(id: string, preloads: string[] = []) {
        return this.client.get(`/${id}?preloads=${preloads.join(',')}`)
    }

    delete(id: any) {
        return this.client.delete(`/${id}`)
    }

    list( query: string = "",  pageSize: number = 50, page: number = 1, preloads: string[] = []) {
        return this.client.get(`/?page=${page}&page_size=${pageSize}&query=${query}&preloads=${preloads.join(',')}`)
    }
}
