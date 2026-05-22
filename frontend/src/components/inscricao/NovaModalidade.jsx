import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";

export default function NovaModalidade({
    atleta, modalidades, modalidadeSelecionada, onChangeModalidade,
    erro, enviando, onVoltar, onSubmit
}) {
    return (
        <Card className="shadow-sm">
            <Card.Body className="p-4">
                <Alert variant="info" className="mb-4">
                    <strong>CPF já cadastrado.</strong><br />
                    Olá, <strong>{atleta.atl_nome}</strong>! Você já possui um cadastro no sistema.
                    Selecione abaixo uma nova modalidade para se inscrever.
                </Alert>

                {erro && <Alert variant="danger">{erro}</Alert>}

                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label>Modalidade <span className="text-danger">*</span></Form.Label>
                        <Form.Select value={modalidadeSelecionada} onChange={onChangeModalidade} required>
                            <option value="">Selecione uma modalidade</option>
                            {modalidades.map((m) => (
                                <option key={m.mod_id} value={m.mod_id}>{m.mod_nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" type="button" onClick={onVoltar}>
                            ← Voltar
                        </Button>
                        <Button variant="primary" type="submit" disabled={enviando}>
                            {enviando
                                ? <><Spinner size="sm" className="me-2" />Inscrevendo...</>
                                : 'Confirmar Inscrição'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}