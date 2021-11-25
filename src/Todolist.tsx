import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {strict} from "assert";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    changeFilter: (filter: FilterType) => void
    // test: (id: number, isDone: boolean) => void
    addTask: (title: string) => void
}

export function Todolist({addTask, changeFilter, deleteTask, ...props}: TodolistPropsType) {
    let [title, setTitle] = useState('')

    const onClickHandler = () => {
        addTask(title)
        setTitle('')
    }
    const onAllClickHandler = (value: FilterType) => changeFilter('all')
    const onActiveClickHandler = (value: FilterType) => changeFilter('active')
    const onComplitedClickHandler = (value: FilterType) => changeFilter('complited')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(title)
        }
    }


    const tasksMap = props.tasks.map((t) => {
        const onClickHandler = () => deleteTask(t.id)

        return (
            <ul>
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                        // onClick={(e) => {
                        //     props.test(t.id, e.currentTarget.checked)
                        // }}
                    />
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>x</button>
                </li>
            </ul>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <div>{tasksMap}</div>
            <div>
                <button onClick={() => onAllClickHandler('all')}>All</button>
                <button onClick={() => onActiveClickHandler('active')}>Active</button>
                <button onClick={() => onComplitedClickHandler('complited')}>Completed</button>
            </div>
        </div>
    )
}
