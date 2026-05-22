import db from '../config/database.js';

class InscricaoModel {

    async criar(dados) {

        const [result] = await db.query(`
            INSERT INTO inscricoes (
                atl_cpf,
                mod_id
            )
            VALUES (?, ?)
        `, [
            dados.atl_cpf,
            dados.mod_id
        ]);

        return result;
    }

    async listarPorCpf(cpf) {

        const [rows] = await db.query(`
            SELECT
                i.*,
                m.mod_nome,
                m.mod_descricao
            FROM inscricoes i
            INNER JOIN modalidades m
                ON m.mod_id = i.mod_id
            WHERE i.atl_cpf = ?
        `, [cpf]);

        return rows;
    }

    async deletarPorCpf(cpf) {

        const [result] = await db.query(`
            DELETE FROM inscricoes
            WHERE atl_cpf = ?
        `, [cpf]);

        return result;
    }
}

export default new InscricaoModel();