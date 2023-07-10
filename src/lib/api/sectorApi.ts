import type { Sector } from "$lib/types";
import RestApi from "./common/restApi";

class SectorApi extends RestApi<Sector> {

    constructor() {
        super('/api/sector');
    }

    problem(sectorId: string) {
        return new RestApi(`/api/sector/${sectorId}/problem`);
    }
   
}

export default new SectorApi();