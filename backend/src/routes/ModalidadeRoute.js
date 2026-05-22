import express from 'express';

import ModalidadeController
from '../controllers/ModalidadeController.js';

const router = express.Router();

router.get(
    '/',
    ModalidadeController.listar
);

router.post(
    '/',
    ModalidadeController.criar
);

router.delete(
    '/:id',
    ModalidadeController.excluir
);

export default router;