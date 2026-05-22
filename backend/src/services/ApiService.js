class ApiService {

    static async handleResponse(response) {

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || 'Erro desconhecido'
            );
        }

        return data;
    }

    static async get(url) {

        const response = await fetch(
            `http://localhost:3000${url}`,
            {
                credentials: 'include'
            }
        );

        return await this.handleResponse(response);
    }

    static async post(url, body) {

        const response = await fetch(
            `http://localhost:3000${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        );

        return await this.handleResponse(response);
    }

    static async put(url, body) {

        const response = await fetch(
            `http://localhost:3000${url}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        );

        return await this.handleResponse(response);
    }

    static async delete(url) {

        const response = await fetch(
            `http://localhost:3000${url}`,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        );

        return await this.handleResponse(response);
    }
}

export default ApiService;