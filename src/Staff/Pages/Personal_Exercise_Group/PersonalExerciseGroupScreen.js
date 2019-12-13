import React, { Component } from 'react'
import { Col, Form, Button, ListGroup } from "react-bootstrap"
import PersonalExerciseGroupStyles from './PersonalExerciseGroupStyles'
import Main from '../../Settings/Template/Main'
import api from '../../../Shared/Settings/api/api'
import InputMask from 'react-input-mask'
import PersonalExercisesGroupController, { getExercisesList, getCategoryList } from './PersonalExerciseGroupController'

const headerProps = {
    icon: 'users',
    title: 'Cadastro de Grupos de Treinamento'
}

const datas = {
    dias: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    meses: [{ numero: "01", extenso: "janeiro", dias: '31' },
    { numero: '02', extenso: "fevereiro", dias: '28' },
    { numero: '03', extenso: "março", dias: '31' },
    { numero: '04', extenso: "abril", dias: '30' },
    { numero: '05', extenso: "maio", dias: '31' },
    { numero: '06', extenso: "junho", dias: '30' },
    { numero: '07', extenso: "julho", dias: '31' },
    { numero: '08', extenso: "agosto", dias: '31' },
    { numero: '09', extenso: "setembro", dias: '30' },
    { numero: '10', extenso: "outubro", dias: '31' },
    { numero: '11', extenso: "novembro", dias: '30' },
    { numero: '12', extenso: "dezembro", dias: '31' }],
    anos: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039']
}

const listDias = datas.dias.map((dia) =>
    <option value={dia}>{dia}</option>
)

const listMeses = datas.meses.map((meses) =>
    <option value={meses.numero}>{meses.extenso}</option>
)

const listAnos = datas.anos.map((anos) =>
    <option value={anos}>{anos}</option>
)

let listEquipamentos = []
let ListNamesExerciseEquipmentSelected = []

export default class PersonalExerciseGroupScrenn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            idPersonal: '',
            idAluno: '',
            dia: '',
            mes: '',
            ano: '',
            nomeTreino: '',
            categoriaTreino: '',
            equipamentoTreino: '',
            nivelTreino: '',
            series: '',
            repeticoes: '',
            intervalos: '',
            observacoes: '',
            instrucao: '',
            linkVideo: '',
            alunosatuais: [],
            listaEquipamentos: [],
            listaCategorias: [],
            listaEquipamentoSelecionado: [],
            erroData: '',
            ExercisesList: [],
            listEquipments: [],
            disableEquipment: true,
            disableEquipmentName: true,
            categoriesList: [],
            personalStudents: []
        };
        this.listaAlunos = this.listaAlunos.bind(this)
        this.listaEquipamentos = this.listaEquipamentos.bind(this)
        this.listaCategorias = this.listaCategorias.bind(this)
        this.listaEquipamentoSelecionado = this.listaEquipamentoSelecionado.bind(this)
        this.validarData = this.validarData.bind(this)
    }

    listaEquipamentoSelecionado = async e => {
        e.preventDefault()
        this.setState({ listaEquipamentoSelecionado: [] })
        this.state.listaEquipamentos.map((equipamento) => {
            if (equipamento.id === e.target.value) {
                console.log(equipamento)
                this.setState({ listaEquipamentoSelecionado: [this.state.listaEquipamentoSelecionado.push(equipamento)] })
            }
        }
        )
        listEquipamentos = this.state.listaEquipamentoSelecionado.map((equipamento) =>
            <option key={equipamento.id} value={equipamento.id}>{equipamento.nomeEquipamento}</option>
        )
        console.log(this.state.listaEquipamentoSelecionado)
    }

    listaAlunos = async () => {
        try {
            const listaAlunos = await api.get('/staff/lista/alunos')
            this.setState({ alunosatuais: listaAlunos.data.alunos })
            this.setState({ idPersonal: listaAlunos.data.staff.id })
        } catch (error) {
            console.log(error)
        }
    }

    listaEquipamentos = async () => {
        try {
            const listaEquipamentos = await api.get('/staff/lista/equipamentos')
            this.setState({ listaEquipamentos: listaEquipamentos.data })
        } catch (error) {
            console.log(error)
        }
    }

    listaCategorias = async () => {
        try {
            const listaCategorias = await api.get('/staff/lista/categorias')
            this.setState({ listaCategorias: listaCategorias.data })
        } catch (error) {
            console.log(error)
        }
    }


    validarData = async e => {
        const mensagemErro = 'Dia inválido, tente novamente' //Que mensagem exibir em caso de erro.
        this.setState({ erroData: '' }) //zerando msg erro
        e.preventDefault() //preventdefault
        const id = e.target.id //pegando id do campo selecionado (dia, mes, ano)                                  //  'id' is assigned a value but never used
        const value = e.target.value //pegando o valor selecionado
        let dia = this.state.dia //pegando valor dia do state
        let mes = this.state.mes //pegando valor mes do state
        let ano = this.state.ano //pegando valor ano do state
        const bissexto = (ano !== '' ? (mes % 400 === 0) ? true : ((mes % 4 === 0) ? true : (mes % 100 !== 0 ? true : false)) : false)
        const mespar = (mes % 2 === 0 ? true : false)
        if (mes) {
            if (mes === '02' && dia <= '29' && bissexto === true) {
                this.setarData(e)
            } else if (mes === '02' && dia < '29' && bissexto === false) {
                this.setarData(e)
            } else if (mes !== '02' && !mespar && mes <= 7 && dia <= '31') {
                this.setarData(e)
            } else if (mes !== '02' && mespar && mes >= 8 && dia <= '31') {
                this.setarData(e)
            } else if (mes !== '02' && dia <= '30') {
                this.setarData(e)
            } else {
                e.target.value = ''
                this.setState({ erroData: mensagemErro })
                this.setarData(e)
            }
        } else {
            this.setarData(e)
        }
    }

    ListNamesExerciseEquipmentSelected = async e => {
        e.preventDefault()
        if (e.target.value) {
            const value = e.target.value
            ListNamesExerciseEquipmentSelected = []
            this.state.ExercisesList.map(exercise => {
                const result = exercise.nomeEquipamento.indexOf(value)
                if (result !== -1) {
                    ListNamesExerciseEquipmentSelected.push(<option value={exercise.nomeExercicio}>{exercise.nomeExercicio}</option>)
                    this.setState({ disableEquipmentName: false })
                }
            })
        } else {
            ListNamesExerciseEquipmentSelected = []
            this.setState({ disableEquipmentName: true })
        }
    }

    ListEquipments = async e => { //esseaquifunciona
        e.preventDefault()
        if (e.target.value) {
            let equipamento = <option>Selecione</option>
            listEquipamentos = []
            this.setState({ listaEquipamentos: [] })
            this.setState({ ListNamesExerciseEquipmentSelected: [] })
            this.state.ExercisesList.map(equip => {
                let result = equip.categoriaEquipamento.indexOf(e.target.value)
                if (result === 0) {
                    this.state.listaEquipamentos.push({ 'nomeEquipamento': equip.nomeEquipamento, 'categoriaEquipamento': equip.categoriaEquipamento })
                }
            })
            this.state.listaEquipamentos.map((equip, index) => {
                if (index === 0) {
                    listEquipamentos.push(<option></option>)
                }
                const result = equip.nomeEquipamento.indexOf(equipamento)
                if (result === -1) {
                    equipamento = equip.nomeEquipamento
                    listEquipamentos.push(<option value={equip.nomeEquipamento}>{equip.nomeEquipamento}</option>)
                    this.setState({ disableEquipment: false })
                }
            })
        } else {
            listEquipamentos = []
            this.setState({ listaEquipamentos: [] })
            ListNamesExerciseEquipmentSelected = []
            this.setState({ disableEquipment: true })
        }
    }

    componentDidMount() {
        this.listaAlunos()
        this.listaEquipamentos()
        this.listaCategorias()
        const exercicios = getExercisesList().then(
            data => {
                this.setState({ ExercisesList: data })
            }
        )
        const alunos = PersonalExercisesGroupController().then(
            data => this.setState({ personalStudents: data })
        )
        const categorias = getCategoryList().then(
            data => this.setState({ categoriesList: data })
        )
    }

    render() {
        const StudentsList = this.state.alunosatuais.map((alunos) =>
            <ListGroup.Item eventKey={alunos.id}>{alunos.nome}</ListGroup.Item>
        )
        const categoriesList = this.state.categoriesList.map((categoria) =>
            <option key={categoria.id} value={categoria.id}>{categoria.categoriaEquipamento}</option>
        )
        return (
            <Main {...headerProps}>
                <Form onSubmit={this.cadastrarTreino}>
                    <Form.Group controlId="nomeTreino">
                        <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Dê um nome ao grupo*:</Form.Label>
                        <Form.Control style={PersonalExerciseGroupStyles.textinput} required placeholder="Nomeie o grupo de treinamento." />
                    </Form.Group>

                    <Form.Group controlId="nomeAluno">
                        <Form.Label style={PersonalExerciseGroupStyles.text}>Para quais aluno será o treino?*:</Form.Label>
                        <ListGroup>
                            {(StudentsList !== '') ? StudentsList : <ListGroup.Item>Você ainda não cadastrou nenhum aluno</ListGroup.Item>}
                        </ListGroup>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="dia">
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Dia:</Form.Label>
                            <Form.Control required as="select" style={PersonalExerciseGroupStyles.textinput} onChange={e => this.validarData(e)}>
                                {listDias}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="mes">
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Mês:</Form.Label>
                            <Form.Control required as="select" style={PersonalExerciseGroupStyles.textinput} onChange={e => this.validarData(e)}>
                                {listMeses}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="ano">
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Ano:</Form.Label>
                            <Form.Control required as="select" style={PersonalExerciseGroupStyles.textinput} onChange={e => this.validarData(e)}>
                                {listAnos}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Hora:</Form.Label>
                            <Form.Control type="number" onChange={e => this.setState({ nome: e.target.value })} min="0" max="23" style={PersonalExerciseGroupStyles.textinput} required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Minutos:</Form.Label>
                            <Form.Control type="number" onChange={e => this.setState({ nome: e.target.value })} min="0" max="59" style={PersonalExerciseGroupStyles.textinput} required />
                        </Form.Group>
                    </Form.Row>
                    <p id="ErroData">{this.state.erroData}</p>
                    <Form.Group controlId="nomeTreino">
                        <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Dê um nome ao treino*:</Form.Label>
                        <Form.Control style={PersonalExerciseGroupStyles.textinput} required placeholder="Nomeie o seu treino" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="categoriaTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ cpf: e.target.value })}>Categoria:</Form.Label>
                            <Form.Control required as="select" style={PersonalExerciseGroupStyles.textinput} onChange={e => this.ListEquipments(e)}>
                                <option selected></option>
                                {categoriesList}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="equipamentoTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text}>Equipamento:</Form.Label>
                            <Form.Control required as="select" onChange={e => this.ListNamesExerciseEquipmentSelected(e)} style={PersonalExerciseGroupStyles.textinput}>
                                {listEquipamentos}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="nivelTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ cpf: e.target.value })}>Nível:</Form.Label>
                            <Form.Control required as="select" style={PersonalExerciseGroupStyles.textinput}>
                                <option value="Leve">Leve</option>
                                <option value="Médio">Médio</option>
                                <option value="Avançado">Avançado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="seriesTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Número de Séries*:</Form.Label>
                            <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseGroupStyles.textinput} required placeholder="Quantas séries o treino irá ter?" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="repeticoesTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Número de Repetições*:</Form.Label>
                            <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseGroupStyles.textinput} required placeholder="Quantas repetições são necessárias?" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="intervalosTreino">
                            <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Número de Intervalos*:</Form.Label>
                            <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseGroupStyles.textinput} required placeholder="Quantos intervalos entre os treinos?" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="observacoesTreino">
                        <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Observações sobre o treino:</Form.Label>
                        <Form.Control as="textarea" rows="3" style={PersonalExerciseGroupStyles.textinput} placeholder="Caso deseje, insira aqui suas observações sobre os treinos." />
                    </Form.Group>
                    <Form.Group controlId="instrucoesTreino">
                        <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Instruções do treino:</Form.Label>
                        <Form.Control plaintext readOnly style={PersonalExerciseGroupStyles.textinput} required placeholder="Instruções sobre o treino." />
                    </Form.Group>
                    <Form.Group controlId="linkVideoTreino">
                        <Form.Label style={PersonalExerciseGroupStyles.text} onChange={e => this.setState({ nome: e.target.value })}>Instruções do Treino em Vídeo**:</Form.Label>
                        <Form.Control style={PersonalExerciseGroupStyles.textinput} required placeholder="Caso queira, disponibilize um link com as instruções do treino em vídeo." />
                    </Form.Group>
                    <small><p>*Dados de preenchimento obrigatório.</p></small>
                    <small>**Os vídeos inseridos são de inteira responsabilidade do usuário.</small>
                    <div style={PersonalExerciseGroupStyles.viewbtn}>
                        {(StudentsList !== '') ? <Button variant="secondary">Cadastrar</Button> : <Button variant="warning" disabled>Você ainda não cadastrou nenhum aluno</Button>}
                    </div>
                </Form>
            </Main>
        )
    }
}