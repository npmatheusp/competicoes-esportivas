/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import axios from "axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        async function verificarLogin() {

            const rotaAtual = window.location.pathname;

            /*
            |--------------------------------------------------------------------------
            | ROTAS PÚBLICAS
            |--------------------------------------------------------------------------
            */

            const rotasPublicas = [
                '/',
                '/login',
                '/inscricao'
            ];

            /*
            |--------------------------------------------------------------------------
            | NÃO VERIFICA LOGIN EM ROTAS PÚBLICAS
            |--------------------------------------------------------------------------
            */

            if (rotasPublicas.includes(rotaAtual)) {

                setCarregando(false);

                return;
            }

            try {

                const resposta = await axios.get(
                    'http://localhost:3000/auth/perfil',
                    {
                        withCredentials: true
                    }
                );

                setUsuario(resposta.data.usuario);

            } catch (error) {

                /*
                |--------------------------------------------------------------------------
                | IGNORA 401
                |--------------------------------------------------------------------------
                */

                if (error.response?.status !== 401) {

                    console.error(
                        'Erro ao verificar login:',
                        error
                    );
                }

                setUsuario(null);

            } finally {

                setCarregando(false);
            }
        }

        verificarLogin();

    }, []);

    async function login(email, senha) {

        const resposta = await axios.post(
            'http://localhost:3000/auth/login',
            {
                email,
                senha
            },
            {
                withCredentials: true
            }
        );

        setUsuario(resposta.data.usuario);
    }

    async function logout() {

        try {

            await axios.post(
                'http://localhost:3000/auth/logout',
                {},
                {
                    withCredentials: true
                }
            );

        } catch (error) {

            console.error(error);

        } finally {

            setUsuario(null);
        }
    }

    return (

        <AuthContext.Provider
            value={{
                usuario,
                carregando,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}