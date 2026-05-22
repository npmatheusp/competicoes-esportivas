import { useState, useEffect } from "react";

import {
    Container,
    Button
} from "react-bootstrap";

import AtletaService from "../../services/AtletaService.js";
import ModalidadeService from "../../services/ModalidadeService.js";

import ValidaCPF from "./ValidaCPF.jsx";
import Formulario from "./Formulario.jsx";
import PainelAtleta from "./PainelAtleta.jsx";

const FORM_INICIAL = {

    atl_cpf: '',
    atl_rg: '',
    atl_orgao_emissor: '',

    atl_nome: '',
    atl_data_nasc: '',

    atl_endereco: '',
    atl_bairro: '',
    atl_municipio: '',
    atl_cep: '',
    atl_uf: '',

    atl_telefone: '',
    atl_celular: '',
    atl_email: '',

    atl_categoria: '',
    atl_faixa_etaria: '',

    atl_clube: '',
    atl_peso: '',
    atl_altura: '',

    atl_restricao_medica: '',

    atl_emergencia_nome: '',
    atl_emergencia_telefone: '',

    mod_id: ''
};

const formatarCpf = (valor) =>

    valor
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);

export default function TelaInscricaoPublica() {

    const [etapa, setEtapa] = useState('cpf');

    const [cpf, setCpf] = useState('');

    const [cpfErro, setCpfErro] = useState('');

    const [cpfCarregando, setCpfCarregando] = useState(false);

    const [modalidades, setModalidades] = useState([]);

    const [atleta, setAtleta] = useState(null);

    const [inscricoes, setInscricoes] = useState([]);

    const [formData, setFormData] = useState(FORM_INICIAL);

    const [formErro, setFormErro] = useState('');

    const [formEnviando, setFormEnviando] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | CARREGAR MODALIDADES
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function carregarModalidades() {

            try {

                const dados =
                    await ModalidadeService.listarTodosPublico();

                setModalidades(dados);

            } catch (error) {

                console.error(
                    'ERRO MODALIDADES:',
                    error
                );
            }
        }

        carregarModalidades();

    }, []);

    /*
    |--------------------------------------------------------------------------
    | VERIFICAR CPF
    |--------------------------------------------------------------------------
    */

    const handleVerificarCpf = async (e) => {

        e.preventDefault();

        const cpfLimpo =
            cpf.replace(/\D/g, '');

        if (cpfLimpo.length !== 11) {

            setCpfErro(
                'Digite um CPF válido com 11 dígitos.'
            );

            return;
        }

        setCpfCarregando(true);

        setCpfErro('');

        try {

            const resultado =
                await AtletaService.verificarInscricao(cpf);

            console.log(
                'RESULTADO CPF:',
                resultado
            );

            /*
            |--------------------------------------------------------------------------
            | CPF JÁ INSCRITO
            |--------------------------------------------------------------------------
            */

            if (resultado.inscrito) {

                setAtleta({
                    atl_cpf: cpf
                });

                setInscricoes([]);

                setEtapa('painel');

            } else {

                /*
                |--------------------------------------------------------------------------
                | NOVA INSCRIÇÃO
                |--------------------------------------------------------------------------
                */

                setFormData({
                    ...FORM_INICIAL,
                    atl_cpf: cpf
                });

                setEtapa('formulario');
            }

        } catch (error) {

            console.error(
                'ERRO VERIFICAR CPF:',
                error
            );

            setCpfErro(
                'Erro ao verificar CPF. Tente novamente.'
            );

        } finally {

            setCpfCarregando(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | SALVAR NOVA INSCRIÇÃO
    |--------------------------------------------------------------------------
    */

    const handleSubmitNovo = async (e) => {

        e.preventDefault();

        setFormEnviando(true);

        setFormErro('');

        try {

            const resultado =
                await AtletaService.salvarPublico(formData);

            console.log(
                'RESULTADO INSCRIÇÃO:',
                resultado
            );

            setAtleta({
                atl_nome: formData.atl_nome,
                atl_cpf: formData.atl_cpf
            });

            const modalidadeSelecionada =
                modalidades.find(
                    (m) =>
                        String(m.mod_id)
                        ===
                        String(formData.mod_id)
                );

            setInscricoes(
                modalidadeSelecionada
                    ? [modalidadeSelecionada]
                    : []
            );

            setEtapa('painel');

        } catch (error) {

            console.error(
                'ERRO INSCRIÇÃO:',
                error
            );

            setFormErro(
                'Erro ao enviar inscrição.'
            );

        } finally {

            setFormEnviando(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | REINICIAR
    |--------------------------------------------------------------------------
    */

    const handleReiniciar = () => {

        setEtapa('cpf');

        setCpf('');

        setCpfErro('');

        setAtleta(null);

        setInscricoes([]);

        setFormData(FORM_INICIAL);

        setFormErro('');
    };

    return (

        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#f0f4f8'
            }}
        >

            <div className="bg-dark py-3 mb-4">

                <Container>

                    <h4 className="text-white mb-0">
                        🏅 Inscrições Esportivas
                    </h4>

                </Container>

            </div>

            <Container
                style={{
                    maxWidth:
                        etapa === 'formulario'
                            ? '900px'
                            : '620px'
                }}
            >

                {etapa === 'cpf' && (

                    <ValidaCPF
                        cpf={cpf}
                        cpfErro={cpfErro}
                        carregando={cpfCarregando}
                        onChangeCpf={(e) => {

                            setCpf(
                                formatarCpf(
                                    e.target.value
                                )
                            );

                            setCpfErro('');
                        }}
                        onSubmit={handleVerificarCpf}
                    />
                )}

                {etapa === 'formulario' && (

                    <Formulario
                        formData={formData}
                        onChange={(e) =>

                            setFormData((f) => ({
                                ...f,
                                [e.target.name]:
                                    e.target.value
                            }))
                        }
                        modalidades={modalidades}
                        erro={formErro}
                        enviando={formEnviando}
                        onVoltar={() => setEtapa('cpf')}
                        onSubmit={handleSubmitNovo}
                    />
                )}

                {etapa === 'painel' && atleta && (

                    <PainelAtleta
                        atleta={atleta}
                        modalidades={modalidades}
                        inscricoes={inscricoes}
                        setInscricoes={setInscricoes}
                        onReiniciar={handleReiniciar}
                        onVoltar={() => setEtapa('cpf')}
                    />
                )}

            </Container>

        </div>
    );
}