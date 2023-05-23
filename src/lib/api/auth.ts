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
                setAuthToken(res.data)
            })
    }
}

export function logout() {
    if (browser) {
        window.localStorage.removeItem('auth');
        auth.set({});
        axios.defaults.headers.common['Authorization'] = '';
    }
}

export function register(registaiton: any) {
    if (registaiton.password !== registaiton.passwordConfirm) {
        return Promise.reject('Passwords do not match');
    }

    if (browser) {
        return axios.post("/api/register", registaiton)
            .then((res) => {
                setAuthToken(res.data)
            })
            .catch((error) => {
                return Promise.reject(error?.response?.data?.error.join('<br />') || error);
            });
    }


}

function setAuthToken(data: any) {
    let params = {
        loggedInUser: data.user,
        token: data.token,
        claims: data.claims,
    }
    if (params.token) {
        axios.defaults.headers.common['Authorization'] = `bearer ${params.token}`;
    }
    window.localStorage.setItem('auth', JSON.stringify(params));
    auth.set(params);
    return Promise.resolve(data.user);
}