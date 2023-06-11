import { browser } from '$app/environment';
import axios from 'axios';
import { writable } from 'svelte/store';
import api from './api';

export const flags = writable({

});
const authValue = browser ? JSON.parse(window.localStorage.getItem('auth') || '{}') : {};



export const token = writable(authValue.token)

export const overflow = writable(true)

export const auth = writable(authValue)

export const suggestions = writable({
    features: [],
});


export const state = writable({
    sectors: null,
});
export const selectedProblem = writable({})





api.sector.list("", 1, 100).then((res) => {
    state.set({
        sectors: res.data.entries
    })
});

if(authValue.token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${authValue.token}`
    token.set(authValue.token)
}