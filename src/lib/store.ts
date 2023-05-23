import { browser } from '$app/environment';
import axios from 'axios';
import { writable } from 'svelte/store';

export const flags = writable({

});
const authValue = browser ? JSON.parse(window.localStorage.getItem('auth') || '{}') : {};

if(authValue.token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${authValue.token}`
}

export const overflow = writable(true)

export const auth = writable(authValue)

export const suggestions = writable({
    features: [],
});