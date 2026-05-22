import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/authRoute.js';
import atletaRoute from './routes/atletaRoute.js';
import modalidadeRoute from './routes/modalidadeRoute.js';
import inscricaoRoute from './routes/inscricaoRoute.js';

import { authenticate } from './middlewares/auth.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| ROTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

app.use('/auth', authRoute);

app.use('/api/inscricao', inscricaoRoute);

/*
|--------------------------------------------------------------------------
| ATLETAS SEM LOGIN (TESTE)
|--------------------------------------------------------------------------
*/

app.use('/api/atletas', atletaRoute);

/*
|--------------------------------------------------------------------------
| MODALIDADES PRIVADAS
|--------------------------------------------------------------------------
*/

app.use('/api/modalidade', modalidadeRoute);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});