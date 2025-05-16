import {useRef} from 'react';

import Button from "./Button";

export default function EditProject({project, onAddTask, onClearTask, onDeleteProject}) {
    const refInput = useRef();

    function addTask() {
        if (refInput.current.value) {
            onAddTask(refInput.current.value)
            refInput.current.value = ''    
        }
    }

    function clearTask(idx) {
        onClearTask(idx)
    }
    
    return <div>
        <div><h2>{project.title}</h2><Button text='Delete' onClick={onDeleteProject} /></div>
        <span className="date">{project.date}</span>
        <p>{project.description}</p>
        <hr />
        <h3>Tasks</h3>
        <div>
        <input type="text" ref={refInput} defaultValue='' />
        <button onClick={addTask} >Add Task</button>
        </div>
        <ul>
            {project.tasks.map(task => <li key={task.id}>
                <div>{task.name}</div><button onClick={() => clearTask(task.id)}>Clear</button>
            </li>)}
        </ul>
    </div>
}