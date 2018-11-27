import axios from 'axios';

export class ApiService {
    // I initialize the ApiClient.
    constructor() {
        // The ApiClient wraps calls to the underlying Axios client.
        this.axiosClient = axios.create({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            baseURL: "https://el-equipo-perro.mybluemix.net/"
        });
    }

    // I perform a GET request with the given options.
    async get(options) {
        return this.axiosClient.request({
            method: 'get',
            url: options.url,
            params: options.params
        }).then((response) => {
            return response.data;
        }).catch(( err ) => {
            console.log(`Error get para ${options.url}`, err);
            return (this.normalizeError(err));
        });
    }

    // I perform a POST request with the given options.
    async post(options) {
        return await this.axiosClient.request({
            method: 'post',
            url: options.url,
            data: options.params
        }).then((response) => {
            return response.data;
        }).catch(( err ) => {
            console.log(`Error post para ${options.url}`, err);
            return (Promise.reject(this.normalizeError(err)));
        });
    }

    // ---
    // PRIVATE METHODS.
    // ---

    // Errors can occur for a variety of reasons. I normalize the error response so that
    // the calling context can assume a standard error structure.
    normalizeError( error){
        // NOTE: Since I'm not really dealing with a production API, this doesn't really
        // normalize anything (ie, this is not the focus of this demo).
        return({
            id: '-1',
            code: 'UnknownError',
            message: 'An unexpected error occurred.'
        });

    }
}
