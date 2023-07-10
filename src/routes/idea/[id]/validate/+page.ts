import api from "$lib/api"
import type { Problem } from "$lib/types/index.js";

export async function load({ params }) {

    let response = await api.problem.get(params.id, [
        "user",
        "user.profile",
        "problem_users",
        "problem_users.member",
        "sectors",
        "stakeholders",
        "votes",
        "votes.user",
        "comments",
        "products",
        "contribution_requests",
        "contribution_requests.user"
    ]).catch(e => {
        console.error(e)
        null;
    })

    let problem: Problem = response?.data

    return {
        problem
    }

}