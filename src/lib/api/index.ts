import problemApi from './problemApi';
import userApi from './userApi';
import productApi from './productApi';
import sectorApi from './sectorApi';
import solutionApi from './solutionApi';
import discussionApi from './discussionApi';
import workflowApi from './workflowApi';

import RestApi from './common/restApi';

export default {
    problem: problemApi,
    sector: sectorApi,
    user: userApi,
    solution: solutionApi,
    product: productApi,
    discussion: discussionApi,
    workflow: workflowApi,
    suggestion: new RestApi('/api/problem_suggestion'),
    follower: new RestApi('/api/follower')
}