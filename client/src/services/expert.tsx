import axios from 'axios';

export class ExpertService {

    static BASE_URL = '/api/experts/';

    static find() {
        return axios({
            method: 'get',
            url: '',
            data: {},
            baseURL: this.BASE_URL
        })
    }

    static getById(id) {
        return axios({
            method: 'get',
            url: `${id}`,
            data: {},
            baseURL: this.BASE_URL
        });
    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: `${id}`,
            baseURL: this.BASE_URL
        })
    }
}
