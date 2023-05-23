import axios from "axios";

class ProductApi {

    constructor() {
        console.log('Problem');
    }

    delete(id: any) {
        return axios.delete(`/api/product/${id}`)
    }
}

export default new ProductApi();