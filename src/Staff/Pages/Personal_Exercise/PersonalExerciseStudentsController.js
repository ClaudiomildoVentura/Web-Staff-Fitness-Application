import React, { Component } from 'react'
import api from '../../../Shared/Settings/api/api'

let studentList = []
let studentsQueue = []
let exercisesQueue = []
export const setStudentList = (student) => {
        studentList = student
        console.log(studentList)
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

/*    removeStudentList = student => {
        studentsListQueue.pop(student)
    }
    searchStudentList = student => {
        studentsListQueue.indexOf({studentName: student.studentName})
        return student       
    }*/