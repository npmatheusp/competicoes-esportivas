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

import ModalidadeService from "../../services/ModalidadeService.js";

export default function TelaModalidade() {

    const [modalidades, setModalidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        mod_nome: '',
        mod_descricao: ''
    });

    useEffect(() => {
        carregarModalidades();
    }, []);

    async function carregarModalidades() {

        setLoading(true);

        try {

            const dados = await ModalidadeService.listarTodos();

            setModalidades(dados);

        } catch {

            setError('Erro ao carregar modalidades');

        } finally {

            setLoading(false);
        }
    }

    async function salvar(e) {

        e.preventDefault();

        try {

            await ModalidadeService.salvar(formData);

            setShowModal(false);

            setFormData({
                mod_nome: '',
                mod_descricao: ''
            });

            carregarModalidades();

        } catch {

            setError('Erro ao salvar modalidade');
        }
    }

    async function excluir(id) {

        if (!window.confirm('Deseja excluir esta modalidade?')) {
            return;
        }

        try {

            await ModalidadeService.excluir(id);

            carregarModalidades();

        } catch {

            setError('Erro ao excluir modalidade');
        }
    }

    if (loading) {
        return (
            <Container className="py-4">
                <p>Carregando modalidades...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Modalidades
                </h1>

                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                >
                    Nova Modalidade
                </Button>

            </div>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <Table bordered responsive className="align-middle">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {modalidades.length > 0 ? (

                                modalidades.map((modalidade) => (

                                    <tr key={modalidade.mod_id}>

                                        <td>{modalidade.mod_id}</td>

                                        <td>{modalidade.mod_nome}</td>

                                        <td>{modalidade.mod_descricao}</td>

                                        <td>

                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => excluir(modalidade.mod_id)}
                                            >
                                                Excluir
                                            </Button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >
                                        Nenhuma modalidade encontrada
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Nova Modalidade
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
                                value={formData.mod_nome}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        mod_nome: e.target.value
                                    })
                                }
                                required
                            />

                        </Form.Group>

                        <Form.Group>

                            <Form.Label>
                                Descrição
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.mod_descricao}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        mod_descricao: e.target.value
                                    })
                                }
                            />

                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>

                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="success"
                        >
                            Salvar
                        </Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        </Container>
    );
}