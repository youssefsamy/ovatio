import axios from 'axios';

export class ZipcodeService {

    static BASE_URL = '/api/zipcode';

    static validate(zipcode) {

        return axios({
            method: 'post',
            url: '',
            data: {zipcode: zipcode},
            baseURL: this.BASE_URL
        })
    }

}