import React, { Component } from 'react'
import { Button, Col, Collapse, Form, ListGroup, Row, Tab } from "react-bootstrap"
import PersonalExerciseStyles from './PersonalExerciseStyles'
import Main from '../../Settings/Template/Main'
import api from '../../../Shared/Settings/api/api'
import InputMask from 'react-input-mask'
import { getExercisesList, getCategoryList } from '../../../Shared/Controllers/PersonalExerciseController'
import PersonalStudentsController, { setStudentList, getStudentsList, addStudentList, addStudentQueue } from '../../../Shared/Controllers/PersonalStudentsController'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerProps = {
    icon: 'hand-rock-o',
    title: 'Cadastro de Exercícios'
}

const datas = {
    dias: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],

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

    anos: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032',
        '2033', '2034', '2035', '2036', '2037', '2038', '2039']
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
let EquipmentsList = []
let ListNamesExerciseEquipmentSelected = []
let idsTranslations = { currentExerciseName: 'nome do exercício' }

export default class PersonalExerciseScreen extends Component {
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
            categoriesList: [],
            ExercisesList: [],
            disableEquipment: true,
            disableEquipmentName: true,
            equipmentsList: [],
            equipmentSelect: '',
            categorySelect: '',
            equipmentExerciseNameSelect: '',
            exerciseInstructions: '',
            StudentsQueue: [],
            exercisesQueue: [],
            currentStudentId: '',
            currentStudentName: '',
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            currentHour: '',
            currentMinute: '',
            currentExerciseName: '',
            currentExerciseCategory: '',
            currentExerciseEquipment: '',
            currentEquipmentExerciseName: '',
            currentLevel: '',
            currentSeries: '',
            currentRepeatQuantify: '',
            currentIntervalQuantify: '',
            currentIntervalTime: '',
            currentObservations: '',
            currentExerciseInstruction: '',
            currentExerciseVideoInstructionLink: '',
            errorMessage: '',
            open: true
        };
        this.ListNamesExerciseEquipmentSelected = this.ListNamesExerciseEquipmentSelected.bind(this)
        this.setDate = this.setDate.bind(this)
        this.validateDate = this.validateDate.bind(this)
        this.setValue = this.setValue.bind(this)
        this.setCurrentStudent = this.setCurrentStudent.bind(this)
    }

    ListNamesExerciseEquipmentSelected = async e => {
        e.preventDefault()
        this.setState({ exerciseInstructions: '' })
        console.log(e.target.value)
        if (e.target.value) {
            const value = e.target.value
            ListNamesExerciseEquipmentSelected = []
            this.state.ExercisesList.map(exercise => {
                const result = exercise.nomeEquipamento.indexOf(value)
                console.log(result)
                if (result !== -1) {
                    ListNamesExerciseEquipmentSelected.push(<option value={exercise.nomeExercicio}>{exercise.nomeExercicio}</option>)
                    this.setState({ disableEquipmentName: false })
                }
            })
            if (ListNamesExerciseEquipmentSelected.length >= 1) {
                ListNamesExerciseEquipmentSelected.unshift(<option selected value=""></option>)
            }
        } else {
            ListNamesExerciseEquipmentSelected = []
            this.setState({ disableEquipmentName: true })
        }
    }

    ExerciseNameSelectedInstructions = async e => {
        e.preventDefault()
        const value = e.target.value
        this.state.ExercisesList.map(exercise => {
            const result = exercise.nomeExercicio.indexOf(value)
            if (result === 0) {
                this.setState({ currentExerciseInstructions: exercise.instrucoes })
                console.log(this.state.exerciseInstructions)
            }
        })
    }

    ListEquipments = async e => { //esseaquifunciona
        e.preventDefault()
        EquipmentsList = []
        EquipmentsList.size = 0
        ListNamesExerciseEquipmentSelected = []
        this.setState({ categorySelect: e.target.value })
        this.setState({ equipmentSelect: '' })
        this.setState({ equipmentExerciseNameSelect: '' })
        this.setState({ exerciseInstructions: '' })
        this.setState({ disableEquipment: true })
        this.setState({ disableEquipmentName: true })

        if (e.target.value) {
            let equipamento = <option selected></option>
            this.setState({ equipmentsList: [] })
            this.state.ExercisesList.map(equip => {
                let result = equip.categoriaEquipamento.indexOf(e.target.value)
                if (result === 0) {
                    this.state.equipmentsList.push({ 'nomeEquipamento': equip.nomeEquipamento, 'categoriaEquipamento': equip.categoriaEquipamento })
                }
            })
            this.state.equipmentsList.map((equip, index) => {
                const result = equip.nomeEquipamento.indexOf(equipamento)
                if (result === -1) {
                    //                if(index === 0){
                    //                    EquipmentsList.push(equipamento)
                    //                }
                    equipamento = equip.nomeEquipamento
                    EquipmentsList.push(<option value={equip.nomeEquipamento}>{equip.nomeEquipamento}</option>)
                    this.setState({ disableEquipment: false })
                }
            })
            if (EquipmentsList.length >= 1) {
                EquipmentsList.unshift(<option selected value=""></option>)
            }
        } else {
            EquipmentsList = []
            this.setState({ listaEquipamentos: [] })
            ListNamesExerciseEquipmentSelected = []
        }
    }

    setDate = async e => {
        e.preventDefault()
        const id = e.target.id
        const value = e.target.value
        console.log(id)
        { id === 'currentDay' && this.setState({ currentDay: value }) }
        { id === 'currentMonth' && this.setState({ currentMonth: value }) }
        { id === 'currentYear' && this.setState({ currentYear: value }) }
        console.log(this.state.currentDay)
    }
    validateDate = async e => {
        const errorDateMessage = 'Dia inválido, tente novamente'
        this.setState({ errorMessage: '' })
        e.preventDefault()
        const id = e.target.id //pegando id do campo selecionado (dia, mes, ano)                                  //  'id' is assigned a value but never used
        const value = e.target.value //pegando o valor selecionado
        let day = this.state.currentDay //pegando valor dia do state
        let month = this.state.currentMonth //pegando valor mes do state
        let year = this.state.currentYear //pegando valor ano do state
        { id === 'currentDay' && (day = value) }
        { id === 'currentMonth' && (month = value) }
        { id === 'currentYear' && (year = value) }
        const leap = (year !== '' ? (month % 400 === 0) ? true : ((month % 4 === 0) ? true : (month % 100 !== 0 ? true : false)) : false)
        const evenMonth = (month % 2 === 0 ? true : false)
        if (id) {
            if (month == '02' && day === '29' && leap === true) {
                this.setDate(e)
            } else if ((month === '02') && (day < '29')) {
                this.setDate(e)
            } else if ((month !== '02') && (evenMonth === false) && (month <= 7) && (day <= '31')) {
                this.setDate(e)
            } else if ((month !== '02') && (evenMonth === true) && (month >= 8) && (day <= '31')) {
                this.setDate(e)
            } else if ((month !== '02') && (day <= '30')) {
                this.setDate(e)
            } else if ((month === '' && year === '') || (day === '' && year === '') || (month === '' && day === '')) {
                this.setDate(e)
            } else {
                e.target.value = ''
                this.setState({ errorMessage: errorDateMessage })
            }
            //        {(mes!=='02' && !mespar && mes>=8 && dia==='31') ? this.setState({erroData: mensagemErro}) : this.setState({dia: e.target.value})}        
        } else {
            this.setDate(e)
        }
    }

    setValue = async e => {
        this.setState({ errorMessage: '' })
        e.preventDefault();
        const id = e.target.id
        const value = e.target.value
        console.log(id)
        console.log(value)
        console.log(value.length)
        if (id !== 'currentExerciseVideoLink' && id !== 'currentExerciseComment' & id !== 'currentStudanteId') {
            if (value.length <= 3 && (id !== 'currentDay' && id !== 'currentMonth' && id !== 'currentYear')) {
                this.setState({ errorMessage: 'O ' + idsTranslations[id] + ' deve possuir no mínimo 3 caracteres.' })
            }
        } else {
            this.setState({ id: value })
        }
    }
    async componentDidMount() {
        const exercicios = getExercisesList().then(
            data => {
                this.setState({ ExercisesList: data })
            }
        )
        const alunos = PersonalStudentsController().then(
            data => this.setState({ alunosatuais: data })
        )
        const categorias = getCategoryList().then(
            data => this.setState({ categoriesList: data })
        )
    }

    setCurrentStudent = () => {
        if (this.state.currentStudentId && this.state.currentDay && this.state.currentMonth && this.state.currentYear) {
            this.state.alunosatuais.map(student => {
                const result = this.state.alunosatuais.id.indexOf(student.id)
                if (result === 0) {
                    const array = [{ 'StudanteId': this.state.currentStudentId }, { 'StudanteName': student.name }, { day: this.state.currentDay },
                    { month: this.state.currentMonth }, { year: this.state.currentYear }]
                    const id = student.id
                    addStudentQueue({ id: array })
                }
            })
        }
    }

    setExerciseQueue = () => {
    }
    render() {
        setStudentList(this.state.alunosatuais)
        let listAlunos = ''
        if (this.state.alunosatuais) {
            listAlunos = this.state.alunosatuais.map((alunos) =>
                <option value={alunos.id}>{alunos.nome}</option>
            )
        }

        const listCategorias = this.state.categoriesList.map((categoria) =>
            <option key={categoria.id} value={categoria.id}>{categoria.categoriaEquipamento}</option>
        )
        return (
            <Main {...headerProps}>

                <div className="mb-3" style={PersonalExerciseStyles.containerExerciseQueue}>
                    <p style={PersonalExerciseStyles.titleBox}>Exercícios na Fila para Cadastro</p>
                    <div Style={PersonalExerciseStyles.containerExerciseQueueList}>

                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        <Button onClick={() => this.setState({ open: !this.state.open })}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={this.state.open}
                                            variant="secondary">
                                            Exibir Lista de Exercícios Pré-cadastrado
                                        </Button>

                                        <Collapse in={this.state.open}>
                                            <div id="example-collapse-text">
                                                <ListGroup.Item action href="#link1">
                                                    Exercício 1
                                                </ListGroup.Item>
                                                <ListGroup.Item action href="#link2">
                                                    Exercício 2
                                                </ListGroup.Item>
                                            </div>
                                        </Collapse>

                                    </ListGroup>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#link1">
                                            1
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2">
                                            2
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>

                    </div>
                </div>
                <div className="mb-3" style={PersonalExerciseStyles.containerExerciseQueue}>
                    <p style={PersonalExerciseStyles.titleBox}>Cadastrar Exercício</p>
                    <div style={{ height: 50 }}>
                        {this.state.errorMessage && <p id="errorMessage" >{this.state.errorMessage}</p>}
                    </div>
                    <Form onSubmit={this.cadastrarTreino}>
                        <Button variant="secondary" onClick={this.setCurrentStudent()}>Adicionar Exercício</Button>
                        <Form.Row>
                            <Form.Group as={Col} controlId="currentExerciseName">
                                <Form.Label style={PersonalExerciseStyles.text}>Dê um nome ao treino*:</Form.Label>
                                <Form.Control style={PersonalExerciseStyles.textinput} required placeholder="Nomeie o seu treino" onChange={(e) => this.setValue(e)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="nomeAluno">
                                <Form.Label style={PersonalExerciseStyles.text}>Para qual aluno será o treino?*:</Form.Label>
                                <Form.Control required as="select"
                                    style={PersonalExerciseStyles.textinput}
                                    onChange={e => this.setValue(e)}
                                    disabled={this.state.alunosatuais ? false : true}
                                >
                                    {this.state.alunosatuais ? <option>Selecione o aluno</option> : <option>Você não possui nenhum aluno cadastrado.</option>}
                                    {this.state.alunosatuais && listAlunos}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="currentDay">
                                <Form.Label style={PersonalExerciseStyles.text}>Dia:</Form.Label>
                                <Form.Control required as="select" style={PersonalExerciseStyles.textinput} onChange={e => this.validateDate(e)}>
                                    <option></option>
                                    {listDias}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="currentMonth">
                                <Form.Label style={PersonalExerciseStyles.text}>Mês:</Form.Label>
                                <Form.Control required as="select" style={PersonalExerciseStyles.textinput} onChange={e => this.validateDate(e)}>
                                    <option></option>
                                    {listMeses}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="currentYear">
                                <Form.Label style={PersonalExerciseStyles.text}>Ano:</Form.Label>
                                <Form.Control required as="select" style={PersonalExerciseStyles.textinput} onChange={e => this.validateDate(e)}>
                                    <option></option>
                                    {listAnos}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={PersonalExerciseStyles.text}>Hora:</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ nome: e.target.value })}
                                    min="0" max="23" style={PersonalExerciseStyles.textinput} required />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={PersonalExerciseStyles.text}>Minutos:</Form.Label>
                                <Form.Control type="number" onChange={e => this.setState({ nome: e.target.value })}
                                    min="0" max="59" style={PersonalExerciseStyles.textinput} required />
                            </Form.Group>
                        </Form.Row>
                        <p id="ErroData">{this.state.erroData}</p>
                        <Form.Row>
                            <Form.Group as={Col} controlId="categoriaTreino">
                                <Form.Label style={PersonalExerciseStyles.text}>Categoria:</Form.Label>
                                <Form.Control select={this.state.categorySelect} required as="select" style={PersonalExerciseStyles.textinput} onChange={e => this.ListEquipments(e)}>
                                    <option selected></option>
                                    {listCategorias}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="equipamentoTreino">
                                <Form.Label style={PersonalExerciseStyles.text}>Equipamento:</Form.Label>
                                <Form.Control select={this.state.equipmentSelect} required as="select" disabled={this.state.disableEquipment} style={PersonalExerciseStyles.textinput} onChange={e => this.ListNamesExerciseEquipmentSelected(e)}>
                                    {EquipmentsList}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="nomeExercicioEquipamentoTreino">
                                <Form.Label style={PersonalExerciseStyles.text}>Equipamento:</Form.Label>
                                <Form.Control select={this.state.equipmentExerciseNameSelect} required as="select" disabled={this.state.disableEquipmentName} style={PersonalExerciseStyles.textinput} onChange={e => this.ExerciseNameSelectedInstructions(e)}>
                                    {ListNamesExerciseEquipmentSelected}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="nivelTreino">
                                <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ nivel: e.target.value })}>Nível:</Form.Label>
                                <Form.Control required as="select" style={PersonalExerciseStyles.textinput}>
                                    <option value="Leve">Leve</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Avançado">Avançado</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="qtdseriesTreino">
                                <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ series: e.target.value })}>Número de Séries*:</Form.Label>
                                <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseStyles.textinput} required placeholder="Quantas séries o treino irá ter?" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="repeticoesTreino">
                                <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ repeticoes: e.target.value })}>Número de Repetições*:</Form.Label>
                                <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseStyles.textinput} required placeholder="Quantas repetições são necessárias?" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="qtdIntervalosTreino">
                                <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ qtdIntervalos: e.target.value })}>Número de Intervalos*:</Form.Label>
                                <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseStyles.textinput} required placeholder="Quantos intervalos entre os treinos?" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="tempoIntervalosTreino">
                                <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ tempoIntervalos: e.target.value })}>Tempo de Intervalos*:</Form.Label>
                                <InputMask className="form-control" mask="99" maskChar={null} style={PersonalExerciseStyles.textinput} required placeholder="De quanto tempo será o intervalo?" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="currentExerciseComment">
                            <Form.Label style={PersonalExerciseStyles.text}>Observações sobre o treino:</Form.Label>
                            <Form.Control as="textarea" rows="3" style={PersonalExerciseStyles.textinput} placeholder="Caso deseje, insira aqui suas observações sobre os treinos." onChange={(e) => this.setValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="currentExerciseInstructions">
                            <Form.Label style={PersonalExerciseStyles.text}>Instruções do treino:</Form.Label>
                            <Form.Control as="textarea" rows="5" plaintext readOnly style={PersonalExerciseStyles.textinput} required placeholder="Instruções sobre o treino." value={this.state.currentExerciseInstructions} />
                        </Form.Group>
                        <Form.Group controlId="currentExerciseVideoLink">
                            <Form.Label style={PersonalExerciseStyles.text} onChange={e => this.setState({ linkVideo: e.target.value })}>Instruções do Treino em Vídeo**:</Form.Label>
                            <Form.Control style={PersonalExerciseStyles.textinput} required placeholder="Caso queira, disponibilize um link com as instruções do treino em vídeo." />
                        </Form.Group>
                        <small><p>*Dados de preenchimento obrigatório.</p></small>
                        <small>**Os vídeos inseridos são de inteira responsabilidade do usuário.</small>
                        <Row style={PersonalExerciseStyles.viewbtn}>
                            {(this.state.alunosatuais) ? <Button variant="secondary">Adicionar Exercício</Button> : <Button variant="warning" disabled>Você ainda não cadastrou nenhum aluno</Button>}
                            {(this.state.alunosatuais) ? <Button variant="secondary">Concluir</Button> : <Button variant="secondary" href="../../staff/alunos/cadastro"><FontAwesomeIcon icon={faUserPlus} /> Pré-cadastrar Aluno</Button>}
                        </Row>
                    </Form>
                </div>
            </Main>
        )
    }
}