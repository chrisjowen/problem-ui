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

export const notifications = writable(null)


export const suggestions = writable({
    features: [],
});

export const state = writable({
    sectors: null,
    soons: {entries: [] }
});
export const selectedProblem = writable({})


const defaultSettings = {
    expandProductMenu: false
}

const settingsValue = browser ? JSON.parse(window.localStorage.getItem('settings') || JSON.stringify(defaultSettings)) : defaultSettings
export const settings = writable(settingsValue);


settings.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('settings', JSON.stringify(value))
    }
})



api.sector.list("", 100, 1).then((res) => {
    state.set({
        sectors: res.data
    })
});

if (authValue.token) {
    axios.defaults.headers.common['Authorization'] = `bearer ${authValue.token}`
    token.set(authValue.token)
}