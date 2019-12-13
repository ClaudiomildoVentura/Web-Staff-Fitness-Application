import React from 'react'

export function validarnome(e) {
    e.preventDefault()
    const campo = e.target
    if (campo.id === 'nome') {
        if (campo.value.length >= 3) {
            return { valido: true, erro: '', valor: campo.value }
        } else {
            return { valido: false, erro: 'Preencha o campo nome corretamente', valor: '' }
        }
    }
}

export function validarcpf(e) {
    e.preventDefault()
    const campo = e.target
    if (campo.value.length === 11) {
        return { valido: true, erro: '', valor: campo.value }
    } else {
        return { valido: false, erro: 'Insira um número de CPF válido, apenas os números.', valor: '' }
    }
}

export function validarNumeroTel(e) {
    e.preventDefault()
    const campo = e.target
    if (campo.value.length === 8 || campo.value.length === 9) {
        return { valido: true, erro: '', valor: campo.value }
    } else {
        return { valido: false, erro: 'Insira um número de CPF válido, apenas os números.', valor: '' }
    }
}

export function validarAreaCode(e) {
    e.preventDefault()
    const campo = e.target
    if (campo.value.length === 2) {
        return { valido: true, erro: '', valor: campo.value }
    } else {
        if (campo.value.length === 1) {
            return { valido: false, erro: '', valor: '' }
        }
        return { valido: false, erro: 'Código de área inválido', valor: '' }
    }
}

export function validaremail(e) {
    e.preventDefault()
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const campo = e.target
    const valid = pattern.test(String(campo.value).toLowerCase())
    console.log(valid)
    if (valid) {
        return { valido: true, erro: '', valor: campo.value }
    } else {
        if (campo.value.length < 6) {
            return { valido: false, erro: '', valor: '' }
        } else {
            return { valido: false, erro: 'Insira um endereço de email valido', valor: '' }
        }
    }
}

export function validar(e) {
    e.preventDefault()
    switch (e.target.id) {
        case 'nome': return validarnome(e)
        case 'cpf': return validarcpf(e)
        case 'email': return validaremail(e)
        case 'areaCode': return validarAreaCode(e)
        case 'numeroTel': return validarNumeroTel(e)
        default: return { valido: false, erro: '', valor: '' }
    }
}

export default class validacoes extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state
    }
}