
import axios from "axios";

class WorkflowApi  {

    template(args: any) {
        return axios.post(`/api/workflow/template`, args)
    }


}

export default new WorkflowApi();