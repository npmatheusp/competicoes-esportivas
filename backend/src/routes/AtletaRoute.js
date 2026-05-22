import express from 'express';

import AtletaController
from '../controllers/AtletaController.js';

const router = express.Router();

router.get(
    '/',
    AtletaController.listar
);

router.put(
    '/:cpf',
    AtletaController.atualizar
);

router.delete(
    '/:cpf',
    AtletaController.excluir
);

export default router;