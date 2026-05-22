import ApiService from './ApiService.js';

class AtletaService {

    async listarTodos() {

        return await ApiService.get('/api/atletas');
    }

    async atualizar(cpf, dados) {

        return await ApiService.put(`/api/atletas/${cpf}`, dados);
    }

    async excluir(cpf) {

        return await ApiService.delete(`/api/atletas/${cpf}`);
    }
}

export default new AtletaService();