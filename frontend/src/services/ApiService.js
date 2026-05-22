import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

class ApiService {

    async get(url) {

        try {

            const response = await api.get(url);

            return response.data;

        } catch (error) {

            console.error(
                'Erro GET:',
                error.response?.data || error
            );

            throw error;
        }
    }

    async post(url, data) {

        try {

            const response = await api.post(
                url,
                data
            );

            return response.data;

        } catch (error) {

            console.error(
                'Erro POST:',
                error.response?.data || error
            );

            throw error;
        }
    }

    async put(url, data) {

        try {

            const response = await api.put(
                url,
                data
            );

            return response.data;

        } catch (error) {

            console.error(
                'Erro PUT:',
                error.response?.data || error
            );

            throw error;
        }
    }

    async delete(url) {

        try {

            const response = await api.delete(url);

            return response.data;

        } catch (error) {

            console.error(
                'Erro DELETE:',
                error.response?.data || error
            );

            throw error;
        }
    }
}

export default new ApiService();