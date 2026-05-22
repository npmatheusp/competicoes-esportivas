import { AuthProvider } from './context/AuthContext';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/login.jsx';
import Home from './pages/home.jsx';

import TelaAtleta from "./components/atletas/Tela.jsx";
import TelaModalidade from "./components/modalidade/Tela.jsx";
import TelaInscricao from "./components/inscricao/Tela.jsx";

import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function Layout() {

    const location = useLocation();

    const ocultarNavbar = [
        '/login',
        '/inscricao'
    ].includes(location.pathname);

    return (
        <>
            {!ocultarNavbar && <NavBar />}

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/inscricao"
                    element={<TelaInscricao />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/atletas"
                    element={
                        <ProtectedRoute>
                            <TelaAtleta />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/modalidades"
                    element={
                        <ProtectedRoute>
                            <TelaModalidade />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default function App() {

    return (
        <BrowserRouter>

            <AuthProvider>

                <Layout />

            </AuthProvider>

        </BrowserRouter>
    );
}