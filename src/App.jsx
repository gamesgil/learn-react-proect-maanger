import { useState, useContext, useRef } from "react";
import Button from "./ui/Button";
import NoProjectSelected from "./ui/NoProjectSelected";
import EditProject from "./ui/EditProject";
import CreateProject from "./ui/CreateProject";

import ProjectContextProvider, {
  ProjectContext,
} from "./store/project.context";

import { Project, Task } from "./models";
function App() {
  const projectCtx = useContext(ProjectContext);

  console.log(projectCtx.projects)
  console.log(projectCtx.selectedProjectId)

   return (
    <>
      <button onClick={projectCtx.addProject}>test</button>
        <aside>
          <h2 className="uppercase">your projects</h2>
          <Button text="+ Add Project" onClick={projectCtx.addProject}></Button>
          {projectCtx.projects.length ? (
            <ul>
              {projectCtx.projects
                .filter((project) => project.status !== "new")
                .map((project) => (
                  <li
                    key={project.id}
                    onClick={() => projectCtx.setSelectedProjectId(project.id)}
                  >
                    {project.title}
                  </li>
                ))}
            </ul>
          ) : null}
        </aside>

        <section className="flex flex-col items-center justify-center">
          {projectCtx.projects.length &&
          projectCtx.projects.some((project) => project.status === "new") ? (
            <CreateProject />
          ) : projectCtx.selectedProjectId > -1 ? (
            <EditProject />
          ) : (
            <NoProjectSelected />
          )}
        </section>
        </>
  );
}

export default App;
