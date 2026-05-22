import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {

    const token = req.cookies.auth_token;

    // Verifica se existe token
    if (!token) {

        return res.status(401).json({
            error: 'Token ausente'
        });
    }

    try {

        // Valida token
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                issuer: 'myapp'
            }
        );

        // Salva usuário autenticado
        req.user = payload;

        // Continua requisição
        return next();

    } catch (error) {

        return res.status(401).json({
            error: 'Token inválido ou expirado'
        });
    }
}

export function authorize(...roles) {

    return (req, res, next) => {

        // Verifica autenticação
        if (!req.user) {

            return res.status(401).json({
                error: 'Não autenticado'
            });
        }

        // Verifica permissão
        if (
            roles.length > 0 &&
            !roles.includes(req.user.role)
        ) {

            return res.status(403).json({
                error: 'Sem permissão'
            });
        }

        // Continua
        return next();
    };
}