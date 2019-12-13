import React, { Component } from 'react'
import api from '../../../Shared/Settings/api/api'

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