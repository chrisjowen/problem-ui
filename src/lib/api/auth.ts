import axios from "axios";
import { auth } from "$lib/store";
import { browser } from "$app/environment";



export function login(username: string, password: string) {
    if (browser) {
        return axios
            .post("/api/login", {
                email: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                let data = {
                    loggedInUser: res.data.user,
                    token: res.data.token,
                    claims: res.data.claims,
                }
                if(data.token) {
                    axios.defaults.headers.common['Authorization'] = `bearer ${data.token}`;
                }
                window.localStorage.setItem('auth', JSON.stringify(data));
                auth.set(data);
                return Promise.resolve(res.data.user);
            })
    }
}