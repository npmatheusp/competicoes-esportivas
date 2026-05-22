import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ValidaCPF({ cpf, cpfErro, carregando, onChangeCpf, onSubmit }) {
    const navigate = useNavigate();
    
    return (
        <Card className="shadow-sm">
            <Card.Body className="p-4">
                <h4 className="mb-1">Inscrição de Atleta</h4>
                <p className="text-muted mb-4">
                    Informe seu CPF para verificar se você já possui cadastro.
                </p>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>CPF <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={onChangeCpf}
                            isInvalid={!!cpfErro}
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">{cpfErro}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={carregando}>
                            {carregando
                                ? <><Spinner size="sm" className="me-2" />Verificando...</>
                                : 'Continuar'}
                        </Button>
                    </div>
                </Form>

                <hr className="my-4" />
                
                <div className="text-right">
                    <Button variant="outline-primary" className="w-70" onClick={() => navigate('/')}>
                        ← Voltar ao Login
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}