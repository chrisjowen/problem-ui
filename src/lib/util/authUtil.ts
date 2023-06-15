import { goto } from "$app/navigation";
import { auth } from "$lib/store";

let loggedInUser: any = null;

auth.subscribe((value: any) => {
    loggedInUser = value.loggedInUser;
});

export function redirectIfNotLoggedIn() {
    if (!loggedInUser) {
        goto('/login');
    }
}

export function isLoggedIn() {
    return loggedInUser !== null;
}