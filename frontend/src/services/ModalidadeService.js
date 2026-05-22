import ApiService from './ApiService.js';

class ModalidadeService {

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */

    async listarTodos() {

        return await ApiService.get(
            '/api/modalidade'
        );
    }

    async salvar(dados) {

        return await ApiService.post(
            '/api/modalidade',
            dados
        );
    }

    async excluir(id) {

        return await ApiService.delete(
            `/api/modalidade/${id}`
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PÚBLICO
    |--------------------------------------------------------------------------
    */

    async listarTodosPublico() {

        return await ApiService.get(
            '/api/inscricao/modalidade'
        );
    }
}

export default new ModalidadeService();