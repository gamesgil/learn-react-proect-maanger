import Button from './Button';

export default function NoProjectSelected({isEmpty, onCreate}) {
    return (<div className="flex flex-col items-center justify-center">
            <img src="src/assets/no-projects.png" alt="" width="100" />
            <h3 className="font-bold text-2xl">No Project Selected</h3>
            <span className="text-xl">Select a project {isEmpty && 'or get started with a new one'}</span>
            
            {isEmpty ? <><Button text='Create new project' onClick={onCreate}></Button></> : null}
          </div>)
}