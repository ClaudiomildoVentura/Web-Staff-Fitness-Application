import React, { Component } from 'react'
import { Button, Card, Container, Col, ListGroup, Row, ListGroupItem } from "react-bootstrap"
import PersonalPlanStyles from './PersonalPlanStyles'
import Main from '../../Settings/Template/Main'

const headerProps = {
  icon: 'line-chart',
  title: 'Opções de Escolha de Planos',
}

export default class PersonalPlanScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { linkPlanos: 0 }
    this.goShopping = this.goShopping.bind(this)
  }

  goShopping = async e => {
    e.preventDefault();
    const { id, value } = e.target
    console.log(e.target.id)
    if (id === 'gratuito') {
      this.props.history.push({
        pathname: '/compras',
        state: { items: { id: value, description: 'gratuito', amount: 0 } }
      })
    } else if (id === 'lite') {
      this.props.history.push({
        pathname: '/compras',
        state: { items: { id: value, description: 'lite', amount: 13.99 } }
      })
    } else if (id === 'standart') {
      this.props.history.push({
        pathname: '/compras',
        state: { items: { id: value, description: 'standart', amount: 33.99 } }
      })
    } else if (id === 'premium') {
      this.props.history.push({
        pathname: '/compras',
        state: { items: { id: value, description: 'premium', amount: 48.99 } }
      })
    }
  }

  render() {
    return (
      <Main {...headerProps}>
        <Container style={PersonalPlanStyles.container}>
          <Row>
            <Col sm={3}>
              <Card style={PersonalPlanStyles.containerPlan}>
                <Card.Body>
                  <Card.Title style={PersonalPlanStyles.txtTitle}>Plano Gratuito</Card.Title>
                  <Card.Title style={PersonalPlanStyles.txtSubTitle}>Vantagens</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Até 5 alunos</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Acesso Limitado</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitleX}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Criação de rotinas de treinamento</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Acesso gratuito</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtValue}>Gratuito por 30 dias</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button value={1} variant="secondary" size="sm" block id="gratuito" onClick={e => this.goShopping(e)}>Contratar agora</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card style={PersonalPlanStyles.containerPlan}>
                <Card.Body>
                  <Card.Title style={PersonalPlanStyles.txtTitle}>Plano Lite</Card.Title>
                  <Card.Title style={PersonalPlanStyles.txtSubTitle}>Vantagens</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Até 10 alunos</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Acesso total</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitleX}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Criação de rotinas de treinamento</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Suporte ilimitado</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtValue}>R$ 14,99</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button value={2} variant="secondary" size="sm" block id="lite" onClick={e => this.goShopping(e)}>Contratar agora</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card style={PersonalPlanStyles.containerPlan}>
                <Card.Body>
                  <Card.Title style={PersonalPlanStyles.txtTitle}>Plano Standard</Card.Title>
                  <Card.Title style={PersonalPlanStyles.txtSubTitle}>Vantagens</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Até 30 alunos</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Acesso total</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitleX}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Criação de rotinas de treinamento</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Suporte ilimitado</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtValue}>R$ 34,99</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button value={3} variant="secondary" size="sm" block id="standart" onClick={e => this.goShopping(e)}>Contratar agora</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3}>
              <Card style={PersonalPlanStyles.containerPlan}>
                <Card.Body >
                  <Card.Title style={PersonalPlanStyles.txtTitle}>Plano Premium</Card.Title>
                  <Card.Title style={PersonalPlanStyles.txtSubTitle}>Vantagens</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Até 50 alunos</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Acesso total</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitleX}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Criação de rotinas de treinamento</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtListTitle}><i className="fa fa-check" style={PersonalPlanStyles.icon}></i>Suporte ilimitado</ListGroupItem>
                  <ListGroupItem style={PersonalPlanStyles.txtValue}>R$ 49,99</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button value={4} variant="secondary" size="sm" block id="premium" onClick={e => this.goShopping(e)}>Contratar agora</Button>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </Main>
    )
  }
}