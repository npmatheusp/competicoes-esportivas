import AtletaModel from '../models/AtletaModel.js';
import ModalidadeModel from '../models/ModalidadeModel.js';
import InscricaoModel from '../models/InscricaoModel.js';

class InscricaoController {

    async verificarCpf(req, res) {

        try {

            const { cpf } = req.params;

            const atleta =
                await AtletaModel.buscarPorCpf(cpf);

            if (!atleta) {

                return res.json({
                    inscrito: false
                });
            }

            const modalidades =
                await InscricaoModel.listarPorCpf(cpf);

            return res.json({
                inscrito: true,
                atleta,
                modalidades
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao verificar CPF'
            });
        }
    }

    async listarModalidades(req, res) {

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

            const dados = req.body;

            const atletaExistente =
                await AtletaModel.buscarPorCpf(
                    dados.atl_cpf
                );

            if (!atletaExistente) {

                await AtletaModel.criar(dados);
            }

            await InscricaoModel.criar({
                atl_cpf: dados.atl_cpf,
                mod_id: dados.mod_id
            });

            return res.json({
                sucesso: true,
                atleta: dados
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Erro ao realizar inscrição'
            });
        }
    }
}

export default new InscricaoController();