import db from '../config/database.js';

class ModalidadeModel {

    async listar() {

        const [rows] = await db.query(`
            SELECT *
            FROM modalidades
            ORDER BY mod_nome
        `);

        return rows;
    }

    async criar(dados) {

        const [result] = await db.query(`
            INSERT INTO modalidades (
                mod_nome,
                mod_descricao
            )
            VALUES (?, ?)
        `, [
            dados.mod_nome,
            dados.mod_descricao
        ]);

        return result;
    }

    async deletar(id) {

        const [result] = await db.query(
            `DELETE FROM modalidades WHERE mod_id = ?`,
            [id]
        );

        return result;
    }
}

export default new ModalidadeModel();