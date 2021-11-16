import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'complited'

function App() {

    let state: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Hello world", isDone: true},
        {id: 5, title: "I am Happy", isDone: false},
        {id: 6, title: "Fixed life", isDone: false},
        {id: 7, title: "Work hard", isDone: false},
        {id: 8, title: "Go home", isDone: false},
        {id: 9, title: "I don't like late", isDone: false},
        {id: 10, title: "kf k", isDone: false},
        {id: 11, title: "Star Wars", isDone: false},
    ]

    const test = (id: number, isDone: boolean) => {

        let ttt = tasks.map((el) => el.id === id ? {...el, isDone} : el)
        setTasks(ttt)
    }

    const DeleteTask = (taskID: number) => {
        setTasks(tasks = tasks.filter(t => t.id !== taskID))
    }
    let [tasks, setTasks] = useState<Array<TaskType>>(state)

    const [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = (tasks.filter(t => t.isDone === false))
    }
    if (filter === 'complited') {
        tasksForRender = (tasks.filter(t => t.isDone === true))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForRender}
                      DeleteTask={DeleteTask}
                      changeFilter={changeFilter}
                      test={test}
            />
        </div>
    );
}

export default App;
