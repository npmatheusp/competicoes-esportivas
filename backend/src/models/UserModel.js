import db from '../config/database.js';

class UserModel {

    async buscarPorEmail(email) {

        const [rows] = await db.query(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email]
        );

        return rows[0];
    }
}

export default new UserModel();