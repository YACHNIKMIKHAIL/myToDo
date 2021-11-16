import React, {useState} from 'react';
import {FilterType, TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    DeleteTask: (taskID: number) => void
    changeFilter: (filter: FilterType) => void
    test: (id: number, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {


    const tasksMap = props.tasks.map((t) => {

        return (
            <ul>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}
                           onClick={(e) => {
                               props.test(t.id, e.currentTarget.checked)
                           }}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.DeleteTask(t.id)}>x</button>
                </li>
            </ul>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <div>{tasksMap}</div>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('complited')}>Completed</button>
            </div>
        </div>
    )
}
