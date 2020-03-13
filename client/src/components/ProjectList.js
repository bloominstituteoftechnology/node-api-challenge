import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const initialProject = {
  name: "",
  description: "",
  completed: false
};

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(initialProject);
  const [projectToDelete, setProjectToDelete] = useState();
  const [adding, setAdding] = useState(false);
  const [projectToAdd, setProjectToAdd] = useState({
    name: "",
    description: "",
    completed: false
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => {
        setProjects(res.data);
        console.log("res", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const addProject = e => {
    axios
      .post('http://localhost:5000/api/projects', projectToAdd)
      .then(res => {
        setProjectToAdd(res.data)
        console.log('Project Added!');
      })
      .catch(err => console.log(err));
  };

  const editProject = project => {
    setEditing(true);
    setProjectToEdit(project);
  };

  const saveEdit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/projects/${projectToEdit.id}`, projectToEdit)
    .then(res => {
      console.log(res.data);
      axios
      .get(`http://localhost:5000/api/projects`)
      .then(response => {
        setProjects(response.data);
        window.location.reload();
      });
    })
    .catch(err => console.log(err));
  };

  const deleteProject = project => {
    // make a delete request to delete this project
    axios
    .delete( `http://localhost:5000/api/projects/${project.id}`)
    .then(res => {
      console.log("delete:",res)
      setProjectToDelete(res)
      window.location.reload();
    })
    .catch(err => console.log(err))
  };

  return (
    <div>
      <h1>List of Projects</h1>
      {projects.map(project => (
        <div>
          <Link to={`/${project.id}/actions`}>
            <h3>{project.name} ({project.completed ? "completed" : "not completed"})</h3>
          </Link>
          <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteProject(project)
                  }
                }>
                <button>Delete the Project</button>  
              </span>{" "}
              
            </span>
          <p key={project.description} onClick={() => editProject(project)}>{project.description}</p>
        </div>
      ))}

{editing && (
        <form onSubmit={saveEdit}>
          <legend>edit project</legend>
          <label>
            name:
            <input
              onChange={e =>
                setProjectToEdit({ ...projectToEdit, name: e.target.value })
              }
              value={projectToEdit.name}
            />
          </label>
          <label>
            description:
            <input
              onChange={e =>
                setProjectToEdit({
                  ...projectToEdit,
                  description: e.target.value
                })
              }
              value={projectToEdit.description}
            />
          </label>
          <label>
            completed:
            <input type="checkbox"
              onClick={e =>
                setProjectToEdit({
                  ...projectToEdit,
                  completed: e.target.checked
                })
              }
              checked={projectToEdit.completed}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

       <span className="add" onClick={() => setAdding(true)}><button>Add a Project</button></span>
      {adding && (
        <form className="add-form" onSubmit={addProject}>
          <legend>add project</legend>
          <label>
            title:
            <input
              onChange={e =>
                setProjectToAdd({ ...projectToAdd, name: e.target.value })
              }
              value={projectToAdd.name}
            />
          </label>
          <label>
            description:
            <input
              onChange={e =>
                setProjectToAdd({
                  ...projectToAdd,
                  description: e.target.value
                })
              }
              value={projectToAdd.description}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProjectList;