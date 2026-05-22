import db from '../config/database.js';

class AtletaModel {

    async listar() {

        const [rows] = await db.query(`
            SELECT * FROM atletas
            ORDER BY atl_nome
        `);

        return rows;
    }

    async buscarPorCpf(cpf) {

    const cpfLimpo = cpf.replace(/\D/g, '');

    const [rows] = await db.query(`
        SELECT * FROM atletas
        WHERE REPLACE(REPLACE(REPLACE(atl_cpf, '.', ''), '-', ''), '/', '') = ?
    `, [cpfLimpo]);

    return rows[0];
}
    async criar(dados) {

        const [result] = await db.query(`
            INSERT INTO atletas (
                atl_cpf,
                atl_rg,
                atl_orgao_emissor,
                atl_nome,
                atl_data_nasc,
                atl_endereco,
                atl_bairro,
                atl_municipio,
                atl_cep,
                atl_uf,
                atl_telefone,
                atl_celular,
                atl_email,
                atl_categoria,
                atl_faixa_etaria,
                atl_clube,
                atl_peso,
                atl_altura,
                atl_restricao_medica,
                atl_emergencia_nome,
                atl_emergencia_telefone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            dados.atl_cpf,
            dados.atl_rg,
            dados.atl_orgao_emissor,
            dados.atl_nome,
            dados.atl_data_nasc,
            dados.atl_endereco,
            dados.atl_bairro,
            dados.atl_municipio,
            dados.atl_cep,
            dados.atl_uf,
            dados.atl_telefone,
            dados.atl_celular,
            dados.atl_email,
            dados.atl_categoria,
            dados.atl_faixa_etaria,
            dados.atl_clube,
            dados.atl_peso,
            dados.atl_altura,
            dados.atl_restricao_medica,
            dados.atl_emergencia_nome,
            dados.atl_emergencia_telefone
        ]);

        return result;
    }

    async atualizar(cpf, dados) {

        const [result] = await db.query(`
            UPDATE atletas SET
                atl_nome = ?,
                atl_email = ?,
                atl_telefone = ?,
                atl_categoria = ?,
                atl_clube = ?
            WHERE atl_cpf = ?
        `, [
            dados.atl_nome || '',
            dados.atl_email || '',
            dados.atl_telefone || '',
            dados.atl_categoria || '',
            dados.atl_clube || '',
            cpf
        ]);

        return result;
    }

    async deletar(cpf) {

        const [result] = await db.query(
            `DELETE FROM atletas WHERE atl_cpf = ?`,
            [cpf]
        );

        return result;
    }
}

export default new AtletaModel();