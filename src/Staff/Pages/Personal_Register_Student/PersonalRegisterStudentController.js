import React, { Component } from 'react'
import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'
import {staffStudentsDashboard} from '../../../Shared/Controllers/PersonalStudentsController'

let staffStudents = staffStudentsDashboard()
console.log(staffStudents)
const PersonalRegisterStudentController = async () => {
    try {
        const response = await api.post('/staff/lista/alunos',{id: getId()})
        if (response.data.alunos) {
            const alunos = response.data.alunos
            console.log(alunos)
            return alunos
        }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const getExercisesList = async () => {
    try {
        const response = await api.get('staff/lista/equipamentos')
        return response.data.equipamento
    } catch (error) {
        console.log(error)
        return error.message
    }
}


export const getCategoryList = async () => {
    try {
        const response = await api.get('/staff/lista/categorias')
        return response.data.categoria
    } catch (error) {
        console.log(error)
    }
}


export default PersonalRegisterStudentController