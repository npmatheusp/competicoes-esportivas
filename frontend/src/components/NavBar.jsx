import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';

export default function NavBar() {

    const { usuario, logout } = useAuth();

    const { pathname } = useLocation();

    const handleLogout = async () => {

        if (window.confirm('Deseja sair do sistema?')) {

            await logout();
        }
    };

    const links = [
        {
            to: '/atletas',
            label: 'Atletas'
        },
        {
            to: '/modalidades',
            label: 'Modalidades'
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    🏅 Inscrições Esportivas
                </Link>

                {usuario && (
                    <>
                        <div className="navbar-nav me-auto">

                            {links.map(({ to, label }) => (

                                <Link
                                    key={to}
                                    className={`nav-link ${
                                        pathname === to
                                            ? 'active fw-bold'
                                            : ''
                                    }`}
                                    to={to}
                                >
                                    {label}
                                </Link>

                            ))}

                        </div>

                        <div className="navbar-nav align-items-center">

                            <span className="navbar-text me-3">
                                Olá, {usuario.nome}
                            </span>

                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>

                        </div>
                    </>
                )}

            </div>

        </nav>
    );
}