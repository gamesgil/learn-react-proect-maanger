import { useState } from "react";
import Button from './ui/Button';
import NoProjectSelected from "./ui/NoProjectSelected";
import DeleteProject from "./ui/DeleteProject";
import EditProject from "./ui/EditProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(-1);
  const [mode, setMode] = useState();

    console.log(projects)

  function addProject() {
    setProjects([...projects, {
      id: Math.random(),
      title: '',
      description: '',
      date: '',
      status: 'new'
    }])
  }

  function updateProject(project) {
    console.log({project})
    setProjects(projects.map(p => {
      if (p.id === project.id) {
        return {...project}
      } else {
        return p
      }
    }))

  }

  function cancelProject(project) {
    console.log(project)
    if (project.status === 'new') {
      setProjects(projects.filter(p => p.id !== project.id))
    } else {
      project.status = ''
      setProjects([...projects.filter(p => p.id !== project.id), {...project}])
      setSelectedProjectId(-1)
    }
  }

  return (
    <>
      <aside>
        <h2 className="uppercase">your projects</h2>
        <Button text='+ Add Project' onClick={addProject}></Button>
        {projects.length ? (
          <ul>
            {projects.filter(project => project.status !== 'new').map(project => (
              <li key={project.id} onClick={() => setSelectedProjectId(project.id)}>{project.title}</li>
            ))}
          </ul>
        ) : null}
      </aside>

      <section className="flex flex-col items-center justify-center">
        {projects.length && (projects.some(project => project.status === 'new') || selectedProjectId > -1) ? (
          <EditProject 
            project={projects.find(project => project.status === 'new' || project.id === selectedProjectId)}
            onSubmit={project => updateProject(project)}
            onCancel={project => cancelProject(project)}
             />
        ) : (
          <NoProjectSelected isEmpty={!projects.length} />
        )}
      </section>
    </>
  );
}

export default App;
