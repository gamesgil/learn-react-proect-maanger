import {useRef} from 'react';

import Button from './Button';
import Input from './Input';

export default function EditProject({project, onSubmit, onCancel}) {
    const refTitle = useRef()
    const refDate = useRef()
    const refDescription = useRef()

    console.log({project})
    function onSave() {
        onSubmit({id: project.id, title: refTitle.current.value, description: refDescription.current.value, date: refDate.current.value})
    }

    return <>
        <div>
            <Button text="Cancel" onClick={() => onCancel(project)}></Button>
            <Button text="Save" onClick={onSave}></Button>
        </div>

            <Input className="border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                label="title" id="title" ref={refTitle} />
            <textarea name="description" id="description" ref={refDescription}></textarea>
            <Input className="border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                label="due date" id="due_date" type="date" ref={refDate} />
            
    </>
}