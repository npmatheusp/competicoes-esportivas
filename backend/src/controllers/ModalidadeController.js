import ModalidadeModel from '../models/ModalidadeModel.js';

class ModalidadeController {

    async listar(req, res) {

        try {

            const modalidades =
                await ModalidadeModel.listar();

            return res.json(modalidades);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao listar modalidades'
            });
        }
    }

    async criar(req, res) {

        try {

            const resultado =
                await ModalidadeModel.criar(req.body);

            return res.json(resultado);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao criar modalidade'
            });
        }
    }

    async excluir(req, res) {

        try {

            const { id } = req.params;

            await ModalidadeModel.deletar(id);

            return res.json({
                sucesso: true
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao excluir modalidade'
            });
        }
    }
}

export default new ModalidadeController();