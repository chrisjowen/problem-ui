import { goto } from "$app/navigation";
import { auth } from "$lib/store";
import type { Problem } from "$lib/types";

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


export function isMember(problem: Problem) {
    return loggedInUser != null && (loggedInUser.id  == problem.user_id || problem.problem_users.find((pu: any) => pu.member_id == loggedInUser.id) !=null);
}