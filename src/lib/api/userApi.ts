import RestApi from "./common/restApi";

class UserApi extends RestApi {

    constructor() {
        super("/api/user");
    }
}

export default new UserApi();