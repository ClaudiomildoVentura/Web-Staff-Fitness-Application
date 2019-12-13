import React, { Component } from 'react'
import api from '../../../Shared/Settings/api/api'
import axios from 'axios'
import { Row, Col, Form, Button } from "react-bootstrap"
import PersonalShoppingStyles from './PersonalShoppingStyles'
import Main from '../../Settings/Template/Main'
import { DirectPayment } from 'pagseguro-react'
import Cards from 'react-credit-cards'
import { validar } from '../../../Shared/Settings/Services/Validations/validations'
import 'react-credit-cards/es/styles-compiled.css'
import { getSessionID } from '../../Settings/Services/Pagseguro/settings'
import { Redirect } from 'react-router';
import { getId } from '../../../Shared/Settings/Services/Auth/auth'

const headerProps = {
	icon: 'credit-card ',
	title: 'Formulário de Compra do Plano Solicitado',
}
let gerarboleto = false
const estados = [
	{ sigla: 'AC', nome: 'Acre' },
	{ sigla: 'AL', nome: 'Alagoas' },
	{ sigla: 'AP', nome: 'Amapá' },
	{ sigla: 'AM', nome: 'Amazonas' },
	{ sigla: 'BA', nome: 'Bahia' },
	{ sigla: 'CE', nome: 'Ceará' },
	{ sigla: 'DF', nome: 'Distrito Federal' },
	{ sigla: 'ES', nome: 'Espírito Santo' },
	{ sigla: 'GO', nome: 'Goiás' },
	{ sigla: 'MA', nome: 'Maranhão' },
	{ sigla: 'MT', nome: 'Mato Grosso' },
	{ sigla: 'MS', nome: 'Mato Grosso do Sul' },
	{ sigla: 'MG', nome: 'Minas Gerais' },
	{ sigla: 'PA', nome: 'Pará' },
	{ sigla: 'PB', nome: 'Paraíba' },
	{ sigla: 'PR', nome: 'Paraná' },
	{ sigla: 'PE', nome: 'Pernambuco' },
	{ sigla: 'PI', nome: 'Piauí' },
	{ sigla: 'RJ', nome: 'Rio de Janeiro' },
	{ sigla: 'RN', nome: 'Rio Grande do Norte' },
	{ sigla: 'RS', nome: 'Rio Grande do Sul' },
	{ sigla: 'RO', nome: 'Roraima' },
	{ sigla: 'RR', nome: 'Rondônia' },
	{ sigla: 'SC', nome: 'Santa Catarina' },
	{ sigla: 'SP', nome: 'São Paulo' },
	{ sigla: 'SE', nome: 'Sergipe' },
	{ sigla: 'TO', nome: 'Tocantins' },
]
const listaEstados = estados.map((estado) =>
	<option value={estado.sigla}>{estado.extenso}</option>
)

export default class PersonalShoppingScreen extends Component {

	constructor(props) {
		super(props)

		this.validarCampos = this.validarCampos.bind(this)
		this.state = {
			loading: false,
			error: null,
			success: null,
			paymentLink: null,
			paid: false,
			session: '',
			env: 'sandbox',
			campos: {
				nome: '',
				cpf: '',
				email: '',
				areaCode: '',
				numeroTel: '',
				estado: '',
				cidade: '',
				bairro: '',
				cep: '',
				endereco: '',
				numero: '',
				complemento: '',
				formaPagamento: ''
			},
			erros: {
				nome: '',
				cpf: '',
				email: '',
				areaCode: '',
				numeroTel: '',
				estado: '',
				cidade: '',
				bairro: '',
				cep: '',
				endereco: '',
				tel: '',
				formaPagamento: ''
			},
			validos: {
				nome: '',
				cpf: '',
				email: '',
				areaCode: '',
				numeroTel: '',
				estado: '',
				cidade: '',
				bairro: '',
				cep: '',
				endereco: '',
				numero: '',
				formaPagamento: false,
			},
			purchaseinfo: [],
		}
	}


	validarCampos = async e => {
		e.preventDefault()
		const id = e.target.id
		const validade = validar(e)
		this.setState({ validos: { ...this.state.validos, [id]: validade.valido } })
		this.setState({ campos: { ...this.state.campos, [id]: validade.valor } })
		this.setState({ erros: { ...this.state.erros, [id]: validade.erro } })
		if (this.state.validos.nome == true && this.state.validos.cpf == true && this.state.validos.numeroTel == true && this.state.validos.email == true) {
			gerarboleto = true
		} else {
			gerarboleto = false
		}
	}

	async componentWillMount() {
		this.setState({ compra: { session: await getSessionID() } })
		this.setState({ session: await getSessionID() })
	}

	onSubmit(data) {
		data.preventDefault()
		const payment = {
			mode: 'default',
			currency: 'BRL',
			method: 'BOLETO',
			items: [{
				id: this.props.location.state.items.id,
				description: this.props.location.state.items.description,
				quantity: 1,
				amount: this.props.location.state.items.amount,
			}],
			sender: {
				name: this.state.campos.nome,
				email: this.state.campos.email,
				phone: {
					areaCode: this.state.campos.areaCode,
					number: this.state.campos.numeroTel,
				},
				document: {
					type: 'CPF',
					value: this.state.campos.cpf
				},
			},
			session: this.state.session,
			env: 'sandbox'
		}

		this.setState({
			loading: true,
			error: null,
			success: '',
			paymentLink: null
		})

		axios.post(`https://apipagsegurostafffitness.herokuapp.com/directPayment`, payment)
			.then(res => {
				const { content } = res.data
				let newState = {}

				switch (content.method) {

					case 'boleto':
						newState = {
							success: 'Acesse o link abaixo para imprimir o boleto',
							paymentLink: content.paymentLink
						}
						this.setState({ purchaseinfo: content })
						this.setState({ paymentLink: content.paymentLink })
						console.log(this.state.paymentLink)
						console.log(content)
						if (this.state.paymentLink != '') {
							const abc = api.post('staff/pagamento', content).then(data => console.log(data))
						}
						break

					case 'onlineDebit':
						newState = {
							success: 'Acesse seu baco e finalize a transação',
							paymentLink: content.paymentLink
						}
						break;

					case 'creditCard':
						newState = {
							success: 'Pagamento realizado com sucesso',
						}
						break;
				}

				this.setState({
					paid: true,
					loading: false,
					...newState
				})
			})
			.catch(err => {
				const { content } = err.response.data
				const error = Array.isArray(content) ? content : [content]
				this.setState({
					loading: false,
					error
				})
			})
	}
	render() {
		return (
			<Main {...headerProps}>
				<Col className="p-sm-5">
					<div style={{ width: 'auto', marginLeft: 30, marginBottom: -28, fontWeight: 600 }}>
						<p>Informações sobre o comprador</p>
					</div>
					{this.state.paymentLink == null &&
						<div className="p-3 pt-3 border mx-3 mb-4">
							<Form.Row>
								<Form.Group as={Col} sm={8} controlId="nome" style={PersonalShoppingStyles.textinput}>
									<Form.Label style={PersonalShoppingStyles.text}>Nome do Comprador:</Form.Label>
									<Form.Control required onChange={e => this.validarCampos(e)} placeholder="Digite o nome do Comprador" />
									{this.state.erros.nome && <small id="msgError" style={PersonalShoppingStyles.msgError}>{this.state.erros.nome}</small>}
								</Form.Group>

								<Form.Group as={Col} controlId="cpf" style={PersonalShoppingStyles.textinput}>
									<Form.Label style={PersonalShoppingStyles.text}>CPF Comprador:</Form.Label>
									<Form.Control onChange={e => this.validarCampos(e)} disabled={!this.state.validos.nome} placeholder="Digite o CPF" />
									{this.state.erros.cpf && <small id="msgError" style={PersonalShoppingStyles.msgError}>{this.state.erros.cpf}</small>}
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} sm={8} controlId="email" style={PersonalShoppingStyles.textinput}>
									<Form.Label style={PersonalShoppingStyles.text}>Email:</Form.Label>
									<Form.Control onChange={e => this.validarCampos(e)} disabled={!this.state.validos.cpf} required placeholder="Digite o email do comprador" />
									{this.state.erros.email && <p id="msgError" style={PersonalShoppingStyles.msgError}>{this.state.erros.email}</p>}
								</Form.Group>

								<Col sm={4}>
									<Form.Label style={PersonalShoppingStyles.text}>Telefone:</Form.Label>
									<Row>
										<Form.Group as={Col} sm={4} controlId="areaCode" className="pr-sm-0" style={PersonalShoppingStyles.areaCode}>
											<Form.Control onChange={e => this.validarCampos(e)} disabled={!this.state.validos.email} length={2} style={PersonalShoppingStyles.areaCodeText} required placeholder="00" />
										</Form.Group>

										<Form.Group as={Col} controlId="numeroTel" className="pl-sm-0" style={PersonalShoppingStyles.number}>
											<Form.Control onChange={e => this.validarCampos(e)} disabled={!this.state.validos.areaCode} length={10} style={PersonalShoppingStyles.numberText} required placeholder="99876.5432" />
										</Form.Group>

									</Row>
								</Col>
							</Form.Row>
							<div className="w-100 text-right">
								<Button className="btn-secondary" disabled={!gerarboleto} onClick={this.onSubmit.bind(this)}>Gerar Boleto</Button>
							</div>
						</div>}
					{this.state.paymentLink !== null &&
						<>
							<p className="pt-4 ">Compra gerada com sucesso, clique abaixo para abrir o boleto.</p>
							<div className="w-100 text-right">
								<a className="btn btn-link btn-secondary text-white" href={this.state.paymentLink} target="_blank">Abrir boleto</a>
							</div>
							{window.open(this.state.paymentLink, '_blank')}
						</>
					}
				</Col>
			</Main>
		)
	}
}