import RestApi from "./common/restApi";

class UserApi extends RestApi {

    constructor() {
        super("/api/user");
    }
    profile(id: String) {
        return new RestApi(`${this.path}/${id}/profile`);
    }
}

export default new UserApi();