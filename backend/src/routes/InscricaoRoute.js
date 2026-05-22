import express from 'express';

import InscricaoController
from '../controllers/InscricaoController.js';

const router = express.Router();

router.get(
    '/verificar/:cpf',
    InscricaoController.verificarCpf
);

router.get(
    '/modalidade',
    InscricaoController.listarModalidades
);

router.post(
    '/',
    InscricaoController.criar
);

export default router;