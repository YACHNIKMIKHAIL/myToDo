import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'complited'

function App() {

    let state: Array<TaskType> = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Hello world", isDone: true},
        {id: v1(), title: "I am Happy", isDone: false},
        {id: v1(), title: "Fixed life", isDone: false},
        {id: v1(), title: "Work hard", isDone: false},
        {id: v1(), title: "Go home", isDone: false},
        {id: v1(), title: "I don't like late", isDone: false},
        {id: v1(), title: "kf k", isDone: false},
        {id: v1(), title: "Star Wars", isDone: false},
    ]

    // const test = (id: number, isDone: boolean) => {

    //     let ttt = tasks.map((el) => el.id === id ? {...el, isDone} : el)
    //     setTasks(ttt)
    // }
    let [tasks, setTasks] = useState<Array<TaskType>>(state)

    let [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (taskID: string) => setTasks(tasks = tasks.filter(t => t.id !== taskID))

    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = (tasks.filter(t => !t.isDone))
    }
    if (filter === 'complited') {
        tasksForRender = (tasks.filter(t => t.isDone))
    }
    const changeFilter = (filter: FilterType) => setFilter(filter)

    const addTask = (title: string) => setTasks([{id: v1(), title: title, isDone: false}, ...tasks])


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForRender}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                // test={test}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
