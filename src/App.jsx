import { useState } from "react";
import Button from './ui/Button';
import NoProjectSelected from "./ui/NoProjectSelected";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(-1);
  const [mode, setMode] = useState();

  function addProject() {
    setProjects([...projects, {
      id: Math.random(),
      title: 'A Project'
    }])
  }

  return (
    <>
      <aside>
        <h2 className="uppercase">your projects</h2>
        <Button text='+ Add Project' onClick={addProject}></Button>
        {projects.length ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        ) : null}
      </aside>

      <section className="flex flex-col items-center justify-center">
        {selectedProject !== -1 ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <h2>Learning React</h2>
              <Button text='Delete'></Button>
            </div>
            <span>Some text...</span>
          </>
        ) : (
          <NoProjectSelected />
        )}
      </section>
    </>
  );
}

export default App;
