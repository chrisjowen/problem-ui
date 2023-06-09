export default interface Comment {
    id: string;
    comment: string;
    user_id: string;
    user: any;
    inserted_at: string;
    updated_at: string;
    problem_id: string;
    problem: any;
    solution_id: string;
    solution: any;
  }