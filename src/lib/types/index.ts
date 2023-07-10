import type Products from '$lib/components/problem/Products.svelte';

export type { default as PaginationResults } from './paginationResults';
export type { default as Comment } from './comment';
export interface Discussion extends IdentifiableSchema, OwnedSchema {
    problem_id: null | string;
    title: string;
    question: string;
    user: any;
    answers: Answer[];
    tags: [],
}


export interface Product extends IdentifiableSchema, OwnedSchema  {
    name: string;
    title: string;
    img: string;
    description: string;
    url: string;
    screenshot: string;
    match_percent: number;
    problem_id: number;
    problem: null;
    productHuntUrl: string;
    crunchbaseURL: string;
  }


export interface Expert extends IdentifiableSchema, OwnedSchema {
    active: boolean;
    bio: string;
    email: string;
    slug: string;
    expertise: string[];
    img: string;
    institution: string;
    location: string;
    name: string;
    title: string;
}

export interface Stakeholder extends IdentifiableSchema, OwnedSchema {
    type: string;
    description: string;
    problems: [],
    age_from: number;
    age_to: number;
    regions: [],
    gender: string;
    img: string;
    benefits: string;
    professions: [],
    interests: [],
    education: string;
    races: string[];
    socioEcenomics: [],
    problem: Problem;
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
    stakeholders: Stakeholder[];
    products: Products[];
    votes: Vote[];
    contribution_requests: ContributionRequest[];
}


export interface ContributionRequest  extends IdentifiableSchema, OwnedSchema{
    message: string;
    capacity: string;
    problem_id: string;
}

export interface Vote  extends IdentifiableSchema, OwnedSchema{
    liked: boolean;
    comment: string;
    answers: any;
    problem_id: string;
}


export interface Link  extends IdentifiableSchema, OwnedSchema{
    text: string;
    url: string;
    icon:  null |  string;
    tags:  [],
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
    features: [],
    tags: [],
    skills: [],
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
    questions: [],
    tags: [],
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
    tags: [],
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








