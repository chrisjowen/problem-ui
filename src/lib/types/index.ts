
export type { default as PaginationResults } from './paginationResults';
export type { default as Comment } from './comment';
export interface Discussion {
    id: string;
    user_id: string;
    title: string;
    question: string;
    user: any;
    inserted_at: string;
    updated_at: string;

    answers: any[];
}

export interface Problem {
    id: string;
    title: string;
    slug: string;
    blurb: string;
    overview: string;
    status: string;
    inserted_at: string;
    img: string;
    updated_at: string;

    user_id: string;
    user: any;
}

export interface Link {
    id: null | string;
    text: string;
    url: string;
    icon:  null |  string;
    image:  null |  string;
    user_id: null | string;
    user: null | any;
    updated_at: null | string;
    inserted_at: null | string;
}

export interface Sector {
    id: null | string;
    name: string;
    image: string;
    user_id: null | string;
    user: null | any;
    updated_at: null | string;
    inserted_at: null | string;
}



export interface Obstacle {
    id: null | string;
    description: string;
    hint: string;
    state: string;
    questions: string[];
    tags: string[];
    state_history: any[];
    problem_id: null | string;
    problem: null | any;
    updated_at: null | string;
    inserted_at: null | string;
}




export interface User {
    nickname: string;
    email: string;
    name: string;
    last_name: string;
    updated_at: null | string;
    inserted_at: null | string;
}


export interface Page {
    id: null | string;
    title: string;
    body: string;
    version: number;
    tags: string[];
    user_id: number;
    user: User;
    problem_id: null | string;
    problem: null | Problem;
    updated_at: null | string;
    inserted_at: null | string;
}








