import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setCarregando(true);
        try {
            await login(email, senha);
            navigate("/");
        } catch {
            setErro("Falha ao fazer login. Verifique suas credenciais.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-1 fw-bold text-primary">🏅 Inscrições Esportivas</h2>
                    <p className="text-center text-muted mb-4">Faça login para continuar</p>

                    {erro && <Alert variant="danger">{erro}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 py-2 fs-5" disabled={carregando}>
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </Form>

                    <hr className="my-4" />

                    <div className="text-center">
                        <p className="text-muted mb-2">É atleta e quer se inscrever?</p>
                        <Button variant="outline-primary" className="w-100" onClick={() => navigate('/inscricao')}>
                            Realizar Inscrição
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}