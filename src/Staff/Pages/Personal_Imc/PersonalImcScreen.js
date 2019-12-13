import React, { Component } from 'react'
import { Accordion, Button, Card, Col, Container, Row, Form } from "react-bootstrap"
import PersonalImcStyles from './PersonalImcStyles'
import Main from '../../Settings/Template/Main'
import InputMask from 'react-input-mask'
import PersonalStudentsController from '../../../Shared/Controllers/PersonalStudentsController'
import { setStudentList, getStudentsList, addStudentList, addStudentQueue } from '../../../Shared/Controllers/PersonalStudentsController'
import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'
import { getIMCsHistory } from './PersonalImcController'

const headerProps = {
    icon: 'calculator',
    title: 'Cálculo do IMC'
}

let listItems = []
let listItemsData = []

export default class PersonalImcScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imc: [{ cupom: 1, nome: 'Rameldo', imc: '25%' }, { cupom: 2, nome: 'Remildo', imc: '27%' }, { cupom: 3, nome: 'Romuldo', imc: '33%' }],
            currentStudentName: '',
            currentStudentId: '',
            weight: 0,
            height: 0,
            result: 0,
            studentsList: [],
            imcResults: [],
            errorMessage: '',
            studentOptions: [],
            imcHistory: [],
            imcHistoryData: [],
            mensagemErro: '',
            id: '',
            imcx: '',
            idPersonalIMC: '',
            idAlunoIMC: []
        }
        this.massaChange = this.massaChange.bind(this)
        this.alturaChange = this.alturaChange.bind(this)
        this.calcularIMC = this.calcularIMC.bind(this)
        this.setStudent = this.setStudent.bind(this)
        this.listHistory = this.listHistory.bind(this)
    }

    async componentWillMount() {
        await getIMCsHistory().then(data => this.setState({ imcHistoryData: data })).catch(error => console.log(error))
        console.log(this.state.imcHistory)
    }

    listHistoryData = () => {
        if(this.state.imcHistoryData.length > 0){
        listItemsData = this.state.imcHistoryData.map((student, index, date) =>
            <Card col={12}>
{index > 0 && console.log(this.state.imcHistoryData[(index -1)].name == student.name)}
        {console.log(student)}
{(index == 0 || console.log(this.state.imcHistoryData[(index -1)].name == student.name)) && (        
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={student.studentId || student.idAlunoIMC}>
                        {student.studentName || student.name}
                    </Accordion.Toggle>
                </Card.Header> )}
                <Accordion.Collapse eventKey={student.studentId || student.idAlunoIMC}>
<Card.Body> Peso: {student.peso} - Altura: {student.altura} - Resultado: {(student.imcResults || student.IMC)} - {new Date(student.created_at).getDate() + "/" + new Date(student.created_at).getMonth() + "/" + new Date(student.created_at).getFullYear()}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
        }        
    }

    listHistory = () => {
        if(this.state.imcHistory.length > 0){
        listItems = this.state.imcHistory.map((student, index) =>        
            <Card col={12}>
        {console.log(student)}
        {(index == 0 || console.log(this.state.imcHistory[(index -1)].studentName == student.name)) && (        
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={student.studentId || student.idAlunoIMC}>
                        {student.studentName}
                    </Accordion.Toggle>
                </Card.Header> )}
                <Accordion.Collapse eventKey={student.studentId}>
        <Card.Body>Peso: {student.studentWeight} - Altura: {student.studentHeight} - Resultado: {(student.imcResults || student.IMC)}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
        }        
    }

    calcularIMC() {
        const valueHeight = parseFloat(this.state.height).toFixed(2)
        const valueWeight = parseFloat(this.state.weight).toFixed(3)
        if (valueHeight !== 0 && valueWeight !== 0) {
            let height = (valueHeight * valueHeight)
            let resultIMC = (valueWeight / height)
            let result = parseFloat(resultIMC).toFixed(3)
            resultIMC = result
            console.log(resultIMC)
            if (resultIMC !== 0) {
                const date = new Date()
                this.setState({resultado: resultIMC})
                const student = { 'studentId': this.state.currentStudentId, 'studentName': this.state.currentStudentName, 'studentHeight': this.state.height, 'studentWeight': this.state.weight, 'imcResults': resultIMC, 'date': date.toLocaleString() }
                this.setState(prevState => ({imcHistory: [...prevState.imcHistory, student]}))      

            }
        } else {
            this.setState({ errorMessage: 'Campos inválidos para cálculo.' })
        }
    }

    setStudent = async e => {
        e.preventDefault()
        this.state.studentsList.map(student => {
            const value = e.target.value
                this.setState({ currentStudentId: student.idAluno })
                this.setState({ currentStudentName: student.nome })
        })
    }
    massaChange = async e => {
        e.preventDefault()
        let value = (e.target.value)
        value = value.replace(',', '.')
        this.setState({ weight: value })
    }
    alturaChange = async e => {
        e.preventDefault()
        let value = e.target.value
        value = value.replace(',', '.')
        this.setState({ height: value })
    }

    async componentDidMount() {
        const students = PersonalStudentsController().then(
            data => this.setState({ studentsList: data })
        )
    }

    render() {
        let studentListOptions = []
        if (this.state.studentsList) {
            setStudentList(this.state.studentsList)
            studentListOptions = this.state.studentsList.map((alunos, index) =>
                <option value={alunos.nome}>{alunos.nome}</option>
            )
        } else {
            studentListOptions = <option>Você não possui alunos</option>
        }
        this.listHistory()
        this.listHistoryData()
        return (
            <>
                <Main {...headerProps}>
                {console.log(this.state.imcHistory)}
                    <Container style={PersonalImcStyles.container}>
                        <Row>
                            <Col sm={7} >
                                <Form>
                                    <Form.Group as={Row} controlId="students">
                                        <Form.Label className="mr-sm-2" column sm="4" style={PersonalImcStyles.txt}>Aluno:</Form.Label>
                                        <Col sm>
                                            <Form.Control required as="select" onChange={e => this.setStudent(e)}>
                                                {this.state.studentsList && <option key="">Selecione o aluno</option>}
                                                {studentListOptions}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="peso">
                                        <Form.Label className="mr-sm-2" column sm="4" style={PersonalImcStyles.txt}>Peso:</Form.Label>
                                        <Col sm>
                                            <Form.Control type="number" value={this.state.weight} onChange={e => this.massaChange(e)}
                                                min="0.000" step="0.01" style={PersonalImcStyles.txtinput} required readOnly={this.state.studentsList ? false : true} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="altura">
                                        <Form.Label className="mr-sm-2" column sm="4" style={PersonalImcStyles.txt}>Altura:</Form.Label>
                                        <Col sm>
                                            <Form.Control type="number" onChange={e => this.alturaChange(e)}
                                                value={this.state.height} min="0" step="0.01" style={PersonalImcStyles.txtinput} required readOnly={this.state.studentsList ? false : true} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="resultado">
                                        <Container>
                                            <Button onClick={this.calcularIMC} type="button" variant="secondary" size="sm" block style={PersonalImcStyles.btn} disabled={this.state.studentsList ? false : true}>Calcule o imc do aluno</Button>
                                        </Container>
                                        <div style={PersonalImcStyles.containerResult}>
                                            <Form.Label className="mr-sm-2" column sm="4"
                                                style={PersonalImcStyles.txt}>Resultado:{this.state.resultado}
                                            </Form.Label>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={5}>
                                <Card style={PersonalImcStyles.containerCardInfo}>
                                    <Card.Body>
                                        <Card.Title style={PersonalImcStyles.txt}>Imc: Índice de Massa Corpórea</Card.Title>
                                        <Card.Text>Fórmula: Peso dividido pela altura ao quadrado</Card.Text>
                                        <Card.Text>Índices IMC:</Card.Text>
                                        <Card.Text>Abaixo de 17 - Muito abaixo do peso</Card.Text>
                                        <Card.Text>Entre 17 e 18,49 - Abaixo do peso</Card.Text>
                                        <Card.Text>Entre 18,5 e 24,99 - Peso normal</Card.Text>
                                        <Card.Text>Entre 25 e 29,99 - Acima do peso</Card.Text>
                                        <Card.Text>Entre 30 e 34,99 - Obesidade I</Card.Text>
                                        <Card.Text>Entre 35 e 39,99 - Obesidade II (severa)</Card.Text>
                                        <Card.Text>Acima de 40 - Obesidade III (mórbida)</Card.Text>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                         <Row className="p-3">
                            <Accordion col={12} onChange={this.listHistory()}>
                                {listItems}
                                {listItemsData}
                            </Accordion>
        </Row> 
                    </Container>
                </Main>
            </>
        )
    }
}