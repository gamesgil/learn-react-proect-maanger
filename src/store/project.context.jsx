import { createContext, useState, useContext } from "react";

import {Project, Task} from '../models';

export const ProjectContext = createContext({
    projects: [],
    addProject: () => {},
    setSelectedProjectId: () => {},
    updateProject: () => {},
    cancelProject: () => {},
    addTask: () => {},
    clearTask: () => {},
    deleteProject: () => {},
    selectedProjectId: -1
}); // Project[]

export default function ProjectContextProvider({ children }) {
  const projectsCtx = useContext(ProjectContext);
  const [projects, setProjects] = useState(projectsCtx.projects);
  const [selectedProjectId, setSelectedProjectId] = useState(-1);

  const ctxValue = {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    updateProject,
    cancelProject,
    addTask,
    clearTask,
    deleteProject
  };


  function addProject() {
    setProjects(prevProjects => [...prevProjects, new Project()]);
    setSelectedProjectId(-1);
  }

  function updateProject(project) {
    setProjects(prevProjects => prevProjects.map((p) => {
      if (p.id === project.id) {
        return { ...project };
      } else {
        return p;
      }
    }));
  }

  function cancelProject(project) {
    if (project.status === "new") {
      setProjects(prevProjects => prevProjects.filter((p) => p.id !== project.id));
    } else {
      project.status = "";
      setProjects(prevProjects => [
        ...prevProjects.filter((p) => p.id !== project.id),
        { ...project },
      ]);

      setSelectedProjectId(-1);
    }
  }

  function addTask(name) {
    const task = new Task(name);

    setProjects(prevProjects => prevProjects.map((p) => {
      if (p.id === selectedProjectId) {
        return { ...p, tasks: [...p.tasks, task] };
      } else {
        return p;
      }
    }));
  }

  function clearTask(taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
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
    setProjects(prevProjects => prevProjects.filter((project) => project.id !== selectedProjectId));
  }

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
