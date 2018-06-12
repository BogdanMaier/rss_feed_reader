import axios from 'axios';
import { API_HOST } from '../constants/config.js';
import { handleResponse } from './Utils';

class ProductsService {
    getSources() {
        return axios({
            method: 'GET',
            url: API_HOST + 'api/sources',
            headers: {'Content-Type': 'application/json'},
        }).then(handleResponse);
    }

    getData(filter) {
        return axios({
            method: 'GET',
            url: API_HOST + 'api/feed',
            headers: {'Content-Type': 'application/json'},
            params: filter,
        }).then(handleResponse);
    }

    add(feed) {
        return axios({
            method: 'POST',
            url: API_HOST + 'api/feed',
            headers: {'Content-Type': 'application/json'},
            data: feed,
        }).then(handleResponse);
    }

    delete({ title }) {
        return axios({
            method: 'DELETE',
            url: API_HOST + 'api/feed',
            headers: {'Content-Type': 'application/json'},
            data: { title },
        }).then(handleResponse);
    }
}

export default new ProductsService();
