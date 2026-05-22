import { useEffect, useState } from "react";


import {
    Container,
    Card,
    Button,
    Table,
    Modal,
    Form,
    Alert
} from "react-bootstrap";

import AtletaService from "../../services/AtletaService.js";

export default function TelaAtleta() {

    const [atletas, setAtletas] = useState([]);

    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [cpfEditar, setCpfEditar] = useState('');

    const [formData, setFormData] = useState({
        atl_nome: '',
        atl_email: '',
        atl_telefone: '',
        atl_categoria: '',
        atl_clube: ''
    });

    useEffect(() => {

        carregarAtletas();

    }, []);

    async function carregarAtletas() {

        try {

            const dados = await AtletaService.listarTodos();

            console.log('ATLETAS:', dados);

            setAtletas(dados);

        } catch (erro) {

            console.error(erro);

            setError('Erro ao carregar atletas');
        }
    }

    function abrirModal(atleta) {

        console.log('ATLETA EDITAR:', atleta);

        setCpfEditar(atleta.atl_cpf);

        setFormData({
            atl_nome: atleta.atl_nome || '',
            atl_email: atleta.atl_email || '',
            atl_telefone: atleta.atl_telefone || '',
            atl_categoria: atleta.atl_categoria || '',
            atl_clube: atleta.atl_clube || ''
        });

        setShowModal(true);
    }

    function fecharModal() {

        setShowModal(false);
    }

    async function salvar(e) {

        e.preventDefault();

        try {

            console.log('CPF ENVIADO:', cpfEditar);

            console.log('DADOS ENVIADOS:', formData);

            const resposta = await AtletaService.atualizar(
                cpfEditar,
                formData
            );

            console.log('RESPOSTA:', resposta);

            fecharModal();

            carregarAtletas();

        } catch (erro) {

            console.error('ERRO UPDATE FRONT:', erro);

            setError('Erro ao atualizar atleta');
        }
    }

    async function excluir(cpf) {

        if (!window.confirm('Deseja excluir este atleta?')) {
            return;
        }

        try {

            await AtletaService.excluir(cpf);

            carregarAtletas();

        } catch (erro) {

            console.error(erro);

            setError('Erro ao excluir atleta');
        }
    }

    return (
        <Container className="py-4">

            <h1 className="mb-4">
                Atletas
            </h1>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <Card>

                <Card.Body>

                    <Table striped hover responsive>

                        <thead>

                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Categoria</th>
                                <th>Clube</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {atletas.map((atleta) => (

                                <tr key={atleta.atl_cpf}>

                                    <td>{atleta.atl_cpf}</td>
                                    <td>{atleta.atl_nome}</td>
                                    <td>{atleta.atl_email}</td>
                                    <td>{atleta.atl_telefone}</td>
                                    <td>{atleta.atl_categoria}</td>
                                    <td>{atleta.atl_clube}</td>

                                    <td>

                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => abrirModal(atleta)}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => excluir(atleta.atl_cpf)}
                                        >
                                            Excluir
                                        </Button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

            <Modal
                show={showModal}
                onHide={fecharModal}
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Editar Atleta
                    </Modal.Title>

                </Modal.Header>

                <Form onSubmit={salvar}>

                    <Modal.Body>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Nome
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={formData.atl_nome}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        atl_nome: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Email
                            </Form.Label>

                            <Form.Control
                                type="email"
                                value={formData.atl_email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        atl_email: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Telefone
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={formData.atl_telefone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        atl_telefone: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Categoria
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={formData.atl_categoria}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        atl_categoria: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                        <Form.Group>

                            <Form.Label>
                                Clube
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={formData.atl_clube}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        atl_clube: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>

                        <Button
                            variant="secondary"
                            onClick={fecharModal}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit">
                            Salvar
                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </Container>
    );
}