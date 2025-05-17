import { useRef, useContext } from "react";

import Button from "./Button";
import { ProjectContext } from "../store/project.context";

export default function EditProject() {
  const projectCtx = useContext(ProjectContext);
  const project = projectCtx.projects.find(
    (p) => p.id === projectCtx.selectedProjectId
  );
  const refInput = useRef();

  function addTask() {
    projectCtx.addTask(refInput.current.value);
    refInput.current.value = "";
  }

  return (
    <div>
      <div>
        <h2>{project.title}</h2>
        <Button text="Delete" onClick={projectCtx.deleteProject} />
      </div>
      <span className="date">{project.date}</span>
      <p>{project.description}</p>
      <hr />
      <h3>Tasks</h3>
      <div>
        <input type="text" ref={refInput} defaultValue="" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>
            <div>{task.name}</div>
            <button onClick={() => projectCtx.clearTask(task.id)}>Clear</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
