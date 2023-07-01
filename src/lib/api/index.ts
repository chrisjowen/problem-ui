import problemApi from './problemApi';
import userApi from './userApi';
import productApi from './productApi';
import sectorApi from './sectorApi';
import solutionApi from './solutionApi';
import discussionApi from './discussionApi';
import workflowApi from './workflowApi';
import aiProblemApi from './aiProblemApi';
import answerApi from './answerApi';
import ideaApi from './ideaApi';
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
    follower: new RestApi('/api/follower'),
    notifications: new RestApi('/api/notification'),
    ideas: ideaApi,
    membership: new RestApi('/api/membership'),
    expert: new RestApi('/api/expert'),
    obstacle: new RestApi('/api/obstacle'),
    profile: new RestApi('/api/profile'),
    soon: new RestApi('/api/soon'),
    answer:  answerApi,
    aiProblem: aiProblemApi,
    news: new RestApi('/api/feed')
}