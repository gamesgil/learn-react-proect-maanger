import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <aside>
        <h2 class="uppercase">your projects</h2>
        <button>Add Project</button>
        {projects.length ? (
          <ul>
            {projects.map((project) => (
              <li>one</li>
            ))}
          </ul>
        ) : null}
      </aside>

      <section>
        {projects.length ? (
          <>
            <div>
              <h2>Learning React</h2>
              <button>Delete</button>
            </div>
            <span>Some text...</span>
          </>
        ) : (
          <div class="flex flex-col items-center justify-center">
            <img src="src/assets/no-projects.png" alt="" width="100" />
            <h3 class="font-bold text-2xl">No Project Selected</h3>
            <span class="text-xl">Select a project or get started with a new one</span>
            <button class="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">Create new project</button>

          </div>
        )}
      </section>
    </>
  );
}

export default App;
