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
    protected only: string[];

    constructor(baseUrl: string, only: string[] = ["get", "create", "update", "delete", "list"]) {

        this.only = only;
        this.baseUrl = `${PUBLIC_PROBLEM_API_PATH}${baseUrl}`;
        // this.baseUrl = `${baseUrl}`;
        this.client = new Client(this.baseUrl);
    }

    
    update(id: string, params: any) {
        if(!this.only.includes("update")) throw new Error("Method not allowed")
        return this.client.put(`/${id}`, params)
    }

    create(params: any) {
        if(!this.only.includes("create")) throw new Error("Method not allowed")
        return this.client.post("/", params)
    }

    get(id: string, preloads: string[] = []) {
        if(!this.only.includes("get")) throw new Error("Method not allowed")
        return this.client.get(`/${id}?preloads=${preloads.join(',')}`)
    }

    delete(id: any) {
        if(!this.only.includes("delete")) throw new Error("Method not allowed")
        return this.client.delete(`/${id}`)
    }

    list( query: string = "",  pageSize: number = 50, page: number = 1, preloads: string[] = []) {
        if(!this.only.includes("list")) throw new Error("Method not allowed")
        return this.client.get(`/?page=${page}&page_size=${pageSize}&query=${query}&preloads=${preloads.join(',')}`)
    }
}
