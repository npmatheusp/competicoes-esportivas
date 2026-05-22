import ApiService from './ApiService.js';

class AtletaService {

    /*
    |--------------------------------------------------------------------------
    | ADMIN
    |--------------------------------------------------------------------------
    */

    async listarTodos() {

        return await ApiService.get(
            '/api/atletas'
        );
    }

    async atualizar(cpf, dados) {

        return await ApiService.put(
            `/api/atletas/${cpf}`,
            dados
        );
    }

    async excluir(cpf) {

        return await ApiService.delete(
            `/api/atletas/${cpf}`
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PÚBLICO
    |--------------------------------------------------------------------------
    */

    async verificarInscricao(cpf) {

        return await ApiService.get(
            `/api/inscricao/verificar/${cpf}`
        );
    }

    async salvarPublico(dados) {

        return await ApiService.post(
            '/api/inscricao',
            dados
        );
    }
}

export default new AtletaService();