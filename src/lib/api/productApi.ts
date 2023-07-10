import RestApi from "./common/restApi";

class ProductApi  extends RestApi<Product>{

    constructor() {
        super('/api/product');
    }

}

export default new ProductApi();