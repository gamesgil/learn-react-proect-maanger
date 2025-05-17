import {useContext} from 'react';

import Button from './Button';
import { ProjectContext } from '../store/project.context';

export default function NoProjectSelected() {
    const projectCtx = useContext(ProjectContext);

    return (<div className="flex flex-col items-center justify-center">
            <img src="src/assets/no-projects.png" alt="" width="100" />
            <h3 className="font-bold text-2xl">No Project Selected</h3>
            <span className="text-xl">Select a project {!projectCtx.projects.length && 'or get started with a new one'}</span>
            
            {!projectCtx.projects.length ? <><Button text='Create new project' onClick={projectCtx.addProject}></Button></> : null}
          </div>)
}