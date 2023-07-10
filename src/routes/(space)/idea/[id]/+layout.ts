import api from "$lib/api"
import type { Problem } from "$lib/types/index.js";

export async function load({ params }) {
    let preloads = [
        "user",
        "user.profile",
        "problem_users",
        "problem_users.member",
        "sectors",
        "stakeholders",
        "votes",
        "votes.user",
        "comments",
        "comments.user",
        "products",
        "contribution_requests",
        "contribution_requests.user"
    ]
    let response = await api.problem.get(params.id, preloads).catch(e => {
        console.error(e)
        null;
    })
    return {
        problem: response?.data as Problem
    }
}