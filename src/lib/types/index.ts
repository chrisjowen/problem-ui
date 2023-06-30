
export type { default as PaginationResults } from './paginationResults';
export type { default as Comment } from './comment';
export interface Discussion extends IdentifiableSchema, OwnedSchema {
    problem_id: null | string;
    title: string;
    question: string;
    user: any;
    answers: Answer[];
    tags: string[];
}
export interface Problem  extends IdentifiableSchema, OwnedSchema{
    title: string;
    slug: string;
    pinned_note: string;
    blurb: string;
    overview: string;
    status: string;
    img: string;
    sectors: Sector[];
}

export interface Link  extends IdentifiableSchema, OwnedSchema{
    text: string;
    url: string;
    icon:  null |  string;
    tags:  string[];
    image:  null |  string;
}

export interface Answer  extends IdentifiableSchema, OwnedSchema{
    answer:  string;
    discussion_id: string;
}

export interface Idea  extends IdentifiableSchema{
    title:  string;
    img:  string;
    estimated_timescale: number;
    complexity: number;
    description: string;
    features: string[];
    tags: string[];
    skills: string[];
    sectors: Sector[];
}


export interface Sector  extends IdentifiableSchema, OwnedSchema  {
    name: string;
    image: string;
}
export interface Obstacle  extends IdentifiableSchema, OwnedSchema {
    description: string;
    hint: string;
    state: string;
    questions: string[];
    tags: string[];
    state_history: any[];
    problem_id: null | string;
    problem: null | any;
}


export interface User extends IdentifiableSchema {
    username: string;
    email: string;
    name: string;
    last_name: string;
}


export interface Page extends IdentifiableOwnedSchema  {
    title: string;
    body: string;
    version: number;
    tags: string[];
    problem_id: null | string;
    problem: null | Problem;
}


export interface Schema  {
    id: null | string;
}
export interface TimeStampable  {
    updated_at: null | string;
    inserted_at: null | string;
}

export interface OwnedSchema {
    user_id: null | string;
    user: null | User;
}

export interface IdentifiableSchema extends Schema, TimeStampable {}
export interface IdentifiableOwnedSchema extends IdentifiableSchema, OwnedSchema {}








