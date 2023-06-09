import RestApi from "./common/restApi";

class ProductApi  extends RestApi{

    constructor() {
        super('/api/product');
    }

}

export default new ProductApi();