import api from "$lib/api"
import type { Problem } from "$lib/types/index.js";

export async function load({ params }) {

    let response = await api.problem.get(params.id, ["user", "user.profile", "sectors", "stakeholders"]).catch(e => {
        console.error(e)
        null;
    })

    let problem: Problem = response?.data

    return {
        problem
    }


}