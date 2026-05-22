import ApiService from './ApiService.js';

class ModalidadeService {

    async listarTodos() {

        return await ApiService.get('/api/modalidade');
    }

    async listarTodosPublico() {

        return await ApiService.get('/api/modalidade');
    }

    async salvar(dados) {

        return await ApiService.post('/api/modalidade', dados);
    }

    async excluir(id) {

        return await ApiService.delete(`/api/modalidade/${id}`);
    }
}

export default new ModalidadeService();