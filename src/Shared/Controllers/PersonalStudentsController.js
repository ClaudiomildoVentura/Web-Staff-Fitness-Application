import React, { Component } from 'react'
import api from '../Settings/api/api'
import {getId} from '../Settings/Services/Auth/auth'

let staffStudents = []
const PersonalStudentsController = async () => {
    try {
        const response = await api.post('/staff/lista/alunos', {id: getId() })
        if (response.data.alunos) {
            console.log(response.data)
            return response.data.alunos
        }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const staffStudentsDashboard = async () => {
    try {
        const response = await api.post('/staff/lista/alunos', {id: getId() })
        if (response.data.alunos) {
            staffStudents = response.data
            return staffStudents
        }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export function getStaffStudents(){
    return staffStudents
}
let studentList = []
let studentsQueue = []
let exercisesQueue = []
export const setStudentList = (student) => {
        studentList = student
    }

export const addStudentQueue = student => {
       studentsQueue.push(student)
    }

export const getStudentsList = () => {
        return studentList
    }

    export const getStudentsQueue = () => {
        return studentList
    }


export default PersonalStudentsController