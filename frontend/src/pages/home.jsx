import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import AtletaService from "../services/AtletaService.js";
import ModalidadeService from "../services/ModalidadeService.js";
// import InscricaoService from "../services/InscricaoService.js";

export default function Home() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // async function carregarStats() {
        //     try {
        //         const [atletas, modalidades, inscricoes] = await Promise.allSettled([
        //             AtletaService.listarTodos(),
        //             ModalidadeService.listarTodos(),
        //             InscricaoService.listarTodos(),
        //         ]);

        //         setStats({
        //             atletas: atletas.status === 'fulfilled' ? atletas.value.length : '--',
        //             modalidades: modalidades.status === 'fulfilled' ? modalidades.value.length : '--',
        //             inscricoes: inscricoes.status === 'fulfilled' ? inscricoes.value.length : '--',
        //         });
        //     } catch (_) {}
        // }
        // carregarStats();
    }, []);

    const saudacao = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    const primeiroNome = usuario.nome?.split(' ')[0] ?? 'usuário';

    const atalhos = [
        {
            label: 'Atletas',
            descricao: 'Cadastrar e gerenciar atletas',
            path: '/atletas',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
            ),
        },
        {
            label: 'Modalidades',
            descricao: 'Gerenciar modalidades esportivas',
            path: '/modalidades',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
            ),
        },
    ];

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <p className="text-muted mb-0 fs-5">{saudacao()},</p>
                    <h1 className="fw-bold mb-0">{primeiroNome}.</h1>
                </div>
                <Badge bg="primary" className="fs-6 px-3 py-2">
                    {usuario?.usu_perfil ?? 'Usuário'}
                </Badge>
            </div>

            <h2 className="mb-4 text-secondary">Acesso rápido</h2>

            <Row className="g-3">
                {atalhos.map(({ label, descricao, path, icon }) => (
                    <Col md={4} key={path}>
                        <Card
                            className="h-100 shadow-sm border-primary"
                            style={{ cursor: 'pointer', transition: '0.2s' }}
                            onClick={() => navigate(path)}
                            onMouseOver={(e) => e.currentTarget.classList.add('bg-primary', 'text-white')}
                            onMouseOut={(e) => e.currentTarget.classList.remove('bg-primary', 'text-white')}
                        >
                            <Card.Body className="d-flex align-items-center">
                                <div className="me-3">{icon}</div>
                                <div>
                                    <h5 className="mb-1 fw-bold">{label}</h5>
                                    <p className="mb-0 small opacity-75">{descricao}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}