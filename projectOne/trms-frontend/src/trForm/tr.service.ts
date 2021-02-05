import axios from 'axios';
import { TRForm } from './trform';

class TRService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/claims';
    }

    getClaims(): Promise<TRForm []> {
        return axios.get(this.URI).then(result=>result.data);
    }

    addClaim(c: TRForm): Promise<null> {
        return axios.post(this.URI, c).then(result => null);
    }

    getClaimByName(id: string): Promise<TRForm> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }

    updateStatus(c: TRForm): Promise<null> {
        return axios.patch(this.URI, c).then(result => null);
    }

    deleteClaim(id: string): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }

    updateClaim(cl: TRForm): Promise<null> {
        return axios.put(this.URI, cl).then(result => null);
    }

}

export default new TRService();