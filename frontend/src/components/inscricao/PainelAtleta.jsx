import { useState } from "react";
import { Alert, Badge, Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import AtletaService from "../../services/AtletaService.js";

export default function PainelAtleta({
    atleta, modalidades, inscricoes, setInscricoes, onReiniciar, onVoltar
}) {
    const [modSelecionada, setModSelecionada] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [enviando, setEnviando] = useState(false);

    const modalidadesDisponiveis = modalidades.filter(
        m => !inscricoes.some(i => String(i.mod_id) === String(m.mod_id))
    );

    const handleInscrever = async (e) => {
        e.preventDefault();
        if (!modSelecionada) { setErro('Selecione uma modalidade.'); return; }

        setEnviando(true);
        setErro('');
        setSucesso('');
        try {
            await AtletaService.inscreverModalidade(atleta.atl_cpf, modSelecionada);
            const modObj = modalidades.find(m => String(m.mod_id) === String(modSelecionada));
            setInscricoes(prev => [...prev, modObj]);
            setSucesso(`Inscrito em "${modObj.mod_nome}" com sucesso!`);
            setModSelecionada('');
        } catch {
            setErro('Erro ao inscrever. Tente novamente.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Body className="p-4">

                <div className="mb-4 p-3 bg-light rounded">
                    <h5 className="mb-1">{atleta.atl_nome}</h5>
                    <small className="text-muted">CPF: {atleta.atl_cpf}</small>
                </div>

                {erro && <Alert variant="danger" onClose={() => setErro('')} dismissible>{erro}</Alert>}
                {sucesso && <Alert variant="success" onClose={() => setSucesso('')} dismissible>{sucesso}</Alert>}

                <h6 className="text-muted mb-2">
                    Modalidades inscritas <Badge bg="primary">{inscricoes.length}</Badge>
                </h6>
                {inscricoes.length === 0 ? (
                    <p className="text-muted small mb-4">Nenhuma inscrição realizada ainda.</p>
                ) : (
                    <ListGroup className="mb-4">
                        {inscricoes.map((m) => (
                            <ListGroup.Item key={m.mod_id} className="d-flex justify-content-between align-items-center">
                                <strong>{m.mod_nome}</strong>
                                <div>
                                    <Badge bg="secondary" className="me-1">{m.mod_categoria}</Badge>
                                    <Badge bg="info" text="dark">{m.mod_faixa_etaria}</Badge>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                {modalidadesDisponiveis.length > 0 ? (
                    <Form onSubmit={handleInscrever}>
                        <Form.Group className="mb-3">
                            <Form.Label>Inscrever em nova modalidade</Form.Label>
                            <Form.Select value={modSelecionada} onChange={(e) => { setModSelecionada(e.target.value); setErro(''); }}>
                                <option value="">Selecione uma modalidade</option>
                                {modalidadesDisponiveis.map((m) => (
                                    <option key={m.mod_id} value={m.mod_id}>
                                        {m.mod_nome} — {m.mod_categoria} | {m.mod_faixa_etaria} | Vagas: {m.mod_vagas}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" disabled={enviando}>
                            {enviando ? <><Spinner size="sm" className="me-2" />Inscrevendo...</> : '+ Inscrever'}
                        </Button>
                    </Form>
                ) : (
                    <Alert variant="warning" className="mb-0">Você já está inscrito em todas as modalidades disponíveis.</Alert>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-secondary" onClick={onVoltar}>← Voltar</Button>
                    <Button variant="outline-primary" onClick={onReiniciar}>Nova inscrição</Button>
                </div>
            </Card.Body>
        </Card>
    );
}