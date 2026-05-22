import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";


export default function Formulario({
    formData,
    onChange,
    modalidades,
    erro,
    enviando,
    onVoltar,
    onSubmit
}) {

    const field = (
        label,
        name,
        type = 'text',
        required = false,
        readOnly = false
    ) => (

        <Form.Group className="mb-3">

            <Form.Label>
                {label}
                {required && <span className="text-danger"> *</span>}
            </Form.Label>

            <Form.Control
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                className={readOnly ? 'bg-light' : ''}
            />

        </Form.Group>
    );

    return (

        <Card className="shadow-sm mb-4">

            <Card.Header className="bg-white py-3">

                <h5 className="mb-0">
                    Formulário de Inscrição
                </h5>

                <small className="text-muted">
                    Preencha todos os campos obrigatórios
                    (<span className="text-danger">*</span>)
                </small>

            </Card.Header>

            <Card.Body className="p-4">

                {erro && (
                    <Alert variant="danger">
                        {erro}
                    </Alert>
                )}

                <Form onSubmit={onSubmit}>

                    <h6 className="text-muted mb-3">
                        Dados Pessoais
                    </h6>

                    <Row>
                        <Col md={6}>
                            {field('CPF', 'atl_cpf', 'text', true, true)}
                        </Col>

                        <Col md={3}>
                            {field('RG', 'atl_rg')}
                        </Col>

                        <Col md={3}>
                            {field('Órgão Emissor', 'atl_orgao_emissor')}
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            {field('Nome Completo', 'atl_nome', 'text', true)}
                        </Col>

                        <Col md={4}>
                            {field('Data de Nascimento', 'atl_data_nasc', 'date', true)}
                        </Col>
                    </Row>

                    <h6 className="text-muted mb-3 mt-2">
                        Endereço
                    </h6>

                    <Row>
                        <Col md={8}>
                            {field('Endereço', 'atl_endereco')}
                        </Col>

                        <Col md={4}>
                            {field('Bairro', 'atl_bairro')}
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            {field('Município', 'atl_municipio')}
                        </Col>

                        <Col md={4}>
                            {field('CEP', 'atl_cep')}
                        </Col>

                        <Col md={3}>
                            {field('UF', 'atl_uf')}
                        </Col>
                    </Row>

                    <h6 className="text-muted mb-3 mt-2">
                        Contato
                    </h6>

                    <Row>
                        <Col md={4}>
                            {field('Telefone', 'atl_telefone')}
                        </Col>

                        <Col md={4}>
                            {field('Celular', 'atl_celular')}
                        </Col>

                        <Col md={4}>
                            {field('Email', 'atl_email', 'email', true)}
                        </Col>
                    </Row>

                    <h6 className="text-muted mb-3 mt-2">
                        Dados Esportivos
                    </h6>

                    <Row>

                        <Col md={4}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Categoria
                                </Form.Label>

                                <Form.Select
                                    name="atl_categoria"
                                    value={formData.atl_categoria || ''}
                                    onChange={onChange}
                                >

                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="amador">
                                        Amador
                                    </option>

                                    <option value="semi-profissional">
                                        Semi-Profissional
                                    </option>

                                    <option value="profissional">
                                        Profissional
                                    </option>

                                </Form.Select>

                            </Form.Group>

                        </Col>

                        <Col md={4}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Faixa Etária
                                </Form.Label>

                                <Form.Select
                                    name="atl_faixa_etaria"
                                    value={formData.atl_faixa_etaria || ''}
                                    onChange={onChange}
                                >

                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="sub-15">
                                        Sub-15
                                    </option>

                                    <option value="sub-17">
                                        Sub-17
                                    </option>

                                    <option value="sub-20">
                                        Sub-20
                                    </option>

                                    <option value="adulto">
                                        Adulto
                                    </option>

                                    <option value="master">
                                        Master
                                    </option>

                                </Form.Select>

                            </Form.Group>

                        </Col>

                        <Col md={4}>
                            {field('Clube/Equipe', 'atl_clube')}
                        </Col>

                    </Row>

                    <Row>

                        <Col md={3}>
                            {field('Peso (kg)', 'atl_peso', 'number')}
                        </Col>

                        <Col md={3}>
                            {field('Altura (cm)', 'atl_altura', 'number')}
                        </Col>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Modalidade
                                    <span className="text-danger"> *</span>
                                </Form.Label>

                                <Form.Select
                                    name="mod_id"
                                    value={formData.mod_id || ''}
                                    onChange={onChange}
                                    required
                                >

                                    <option value="">
                                        Selecione uma modalidade
                                    </option>

                                    {modalidades?.map((m, index) => (

                                        <option
                                            key={`${m.mod_id}-${m.mod_nome}-${index}`}
                                            value={m.mod_id}
                                        >
                                            {m.mod_nome}
                                        </option>

                                    ))}

                                </Form.Select>

                            </Form.Group>

                        </Col>

                    </Row>

                    <h6 className="text-muted mb-3 mt-2">
                        Saúde e Emergência
                    </h6>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Restrição Médica
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="atl_restricao_medica"
                            value={formData.atl_restricao_medica || ''}
                            onChange={onChange}
                        />

                    </Form.Group>

                    <Row>

                        <Col md={8}>
                            {field('Nome do Contato de Emergência', 'atl_emergencia_nome')}
                        </Col>

                        <Col md={4}>
                            {field('Telefone de Emergência', 'atl_emergencia_telefone')}
                        </Col>

                    </Row>

                    <div className="d-flex justify-content-between mt-3">

                        <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={onVoltar}
                        >
                            ← Voltar
                        </Button>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={enviando}
                        >

                            {enviando ? (
                                <>
                                    <Spinner size="sm" className="me-2" />
                                    Enviando...
                                </>
                            ) : (
                                'Confirmar Inscrição'
                            )}

                        </Button>

                    </div>

                </Form>

            </Card.Body>

        </Card>
    );
}