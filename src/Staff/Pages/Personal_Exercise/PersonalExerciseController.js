import React, { Component } from 'react'
import api from '../../../Shared/Settings/api/api'

const PersonalExercisesController = async () => {
    try {
        const response = await api.get('/staff/lista/alunos')
        if (response.data.alunos) {
            const alunos = response.data.alunos
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


export default PersonalExercisesController