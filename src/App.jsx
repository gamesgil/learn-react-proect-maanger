import { useState, useContext } from "react";
import Button from "./ui/Button";
import NoProjectSelected from "./ui/NoProjectSelected";
import EditProject from "./ui/EditProject";
import CreateProject from "./ui/CreateProject";

import { ProjectContext } from "./store/project.context";

import { Project, Task } from "./models";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(-1);
  const [mode, setMode] = useState();

  const projectsCtx = useContext(ProjectContext);

  function addProject() {
    setProjects([...projects, new Project()]);
    setSelectedProjectId(-1);
  }

  function updateProject(project) {
    const mapped = projects.map((p) => {
      if (p.id === project.id) {
        return { ...project };
      } else {
        return p;
      }
    });

    setProjects(mapped);
  }

  function cancelProject(project) {
    if (project.status === "new") {
      setProjects(projects.filter((p) => p.id !== project.id));
    } else {
      project.status = "";
      setProjects([
        ...projects.filter((p) => p.id !== project.id),
        { ...project },
      ]);

      setSelectedProjectId(-1);
    }
  }

  function addTask(name) {
    const task = new Task(name);
    const mapped = projects.map((p) => {
      if (p.id === selectedProjectId) {
        return { ...p, tasks: [...p.tasks, task] };
      } else {
        return p;
      }
    });

    setProjects(mapped);
  }

  function clearTask(taskId) {
    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === selectedProjectId) {
          return { ...p, tasks: p.tasks.filter((task) => task.id !== taskId) };
        } else {
          return p;
        }
      })
    );
  }

  function deleteProject() {
    setSelectedProjectId(-1);
    setProjects(projects.filter((project) => project.id !== selectedProjectId));
  }

  return (
    <ProjectContext value={projects}>
      <aside>
        <h2 className="uppercase">your projects</h2>
        <Button text="+ Add Project" onClick={addProject}></Button>
        {projects.length ? (
          <ul>
            {projects
              .filter((project) => project.status !== "new")
              .map((project) => (
                <li
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {project.title}
                </li>
              ))}
          </ul>
        ) : null}
      </aside>

      <section className="flex flex-col items-center justify-center">
        {projects.length &&
        projects.some((project) => project.status === "new") ? (
          <CreateProject
            project={projects.find((project) => project.status === "new")}
            onSubmit={(project) => updateProject(project)}
            onCancel={(project) => cancelProject(project)}
          />
        ) : selectedProjectId > -1 ? (
          <EditProject
            project={projects.find(
              (project) => project.id === selectedProjectId
            )}
            onAddTask={(task) => addTask(task)}
            onClearTask={(idx) => clearTask(idx)}
            onDeleteProject={deleteProject}
          />
        ) : (
          <NoProjectSelected isEmpty={!projects.length} onCreate={addProject} />
        )}
      </section>
    </ProjectContext>
  );
}

export default App;
