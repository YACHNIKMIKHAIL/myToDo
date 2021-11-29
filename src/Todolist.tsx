import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {strict} from "assert";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    filter: FilterType
}

export function Todolist({addTask, changeFilter, deleteTask, ...props}: TodolistPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const errorMessage=error?<div style={{color:'lightskyblue'}}>текст в инпут дай!</div>:''

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onAllClickHandler = (value: FilterType) => changeFilter('all')
    const onActiveClickHandler = (value: FilterType) => changeFilter('active')
    const onComplitedClickHandler = (value: FilterType) => changeFilter('complited')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // addTask(title)
            // setTitle('')
            addTaskHandler()
        }
    }

    const allButtonActiveClass=props.filter === 'all' ? 'active-filter' : ''
    const getButtonActiveClass=(value:FilterType)=>props.filter === value ? 'active-filter' : ''


    const tasksMap = props.tasks.map((t) => {
        const onClickHandler = () => deleteTask(t.id)
        const getClasses = () => t.isDone ? 'is-done' : ''

        return (
            <ul>
                <li key={t.id} className={getClasses()}>
                    <input type="checkbox"
                           checked={t.isDone}
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
                <input className={error ? 'error' : ''}
                       type="text"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && errorMessage}
            </div>
            <div>{tasksMap}</div>
            <div>
                <button className={getButtonActiveClass('all')}
                        onClick={() => onAllClickHandler('all')}>All
                </button>
                <button className={getButtonActiveClass('active')}
                        onClick={() => onActiveClickHandler('active')}>Active
                </button>
                <button className={getButtonActiveClass('complited')}
                        onClick={() => onComplitedClickHandler('complited')}>Completed
                </button>
            </div>
        </div>
    )
}
