import {useRef, useContext} from 'react';

import Button from './Button';
import Input from './Input';

import {Project} from '../models';

import {ProjectContext} from '../store/project.context';

export default function CreateProject() {
    const refTitle = useRef()
    const refDate = useRef()
    const refDescription = useRef()
    const projectCtx = useContext(ProjectContext);
    const project = projectCtx.projects.find(p => p.status === 'new')

    function onSave() {
        console.log('on save')
        project.title = refTitle.current.value;
        project.description = refDescription.current.value;
        project.date = refDate.current.value;
        project.status = '';

        projectCtx.updateProject(project);
        console.log({project})
        console.log(projectCtx)
    }

    return <>
        <div>
            <Button text="Cancel" onClick={() => onCancel(project)}></Button>
            <Button text="Save" onClick={onSave}></Button>
        </div>

            <Input key={'title' + project.id} className="border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                label="title" id="title" ref={refTitle} defaultValue={project.title} />
            <textarea key={'description' + project.id} name="description" id="description" ref={refDescription} defaultValue={project.description}></textarea>
            <Input key={'date' + project.id} className="border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                label="due date" id="due_date" type="date" ref={refDate} defaultValue={project.date} />
            
    </>
}