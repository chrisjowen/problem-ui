import RestApi from "./common/restApi";

class SectorApi extends RestApi {

    constructor() {
        super('/api/sector');
    }

    problem(sectorId: string) {
        return new RestApi(`/api/sector/${sectorId}/problem`);
    }
   
}

export default new SectorApi();