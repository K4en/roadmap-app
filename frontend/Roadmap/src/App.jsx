import { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {

    const [projects, setProjects] = useState([]);
    const [phases, setPhases] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [newProjectName, setNewProjectName] = useState("");
    const [addingTaskToPhase, setAddingTaskToPhase] = useState(null);
    const [newTaskName, setNewTaskName] = useState("");

    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editingPhaseId, setEditingPhaseId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editName, setEditName] = useState("");

    const selectedProject = projects.find(
        project => project.id === selectedProjectId
        );

    function loadData(){
        fetch("http://127.0.0.1:8000/projects")
            .then(r => r.json())
            .then(setProjects);

        fetch("http://127.0.0.1:8000/phases")
            .then(r => r.json())
            .then(setPhases);

        fetch("http://127.0.0.1:8000/tasks")
            .then(r => r.json())
            .then(setTasks);
        }

    useEffect(() => {
            loadData();
    }, []);



    function toggleTask(task){
        fetch(
            `http://127.0.0.1:8000/tasks/${task.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    name: task.name,
                    completed: !task.completed
                    })
                })
            .then(loadData);
    }

    function createProject(){

        fetch("http://127.0.0.1:8000/projects",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                name: newProjectName
                })
            })
            .then(loadData);
        }

    function editProject(id, name, completed){
        fetch(
            `http://127.0.0.1:8000/projects/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    name: name,
                    completed: completed
                    })
                })
            .then(loadData);
        }

    function createPhase(){

        fetch(`http://127.0.0.1:8000/phases`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                project_id: selectedProjectId,
                name: "Phase"
            })
        })
        .then(loadData);
       }

    function editPhase(id, name, completed){
        fetch(
            `http://127.0.0.1:8000/phases/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    name: name,
                    completed: completed
                    })
                })
            .then(loadData);
        }

    function createTask(phaseId){
        fetch(`http://127.0.0.1:8000/tasks`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                phase_id: phaseId,
                name:newTaskName
                })
            })
            .then(loadData);
    }

    function editTask(id, name, completed){
        fetch(
            `http://127.0.0.1:8000/tasks/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    name: name,
                    completed: completed
                    })
                })
            .then(loadData);
        }

    function deleteProject(projectId){
        fetch(`http://127.0.0.1:8000/projects/${projectId}`,{
            method: "DELETE"
            })
            .then(() => {
                setSelectedProjectId(null);
                loadData();
            });
        }

    function deletePhase(phaseId){
        fetch(`http://127.0.0.1:8000/phases/${phaseId}`,{
            method: "DELETE"
            })
            .then(loadData);
        }


    function deleteTask(phaseId, taskId){
        fetch(
            `http://127.0.0.1:8000/tasks/${taskId}`,
            {
                method: "DELETE"
                }
            )
            .then(loadData);

        }


    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-3 border-end vh-100 p-3">

                <h2>Projects</h2>
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                />
                <button onClick={createProject}>
                    Add Project
                </button>


                {projects.map((project) => (
                    <div className="card p-2 mb-3" key={project.id}>
                    <div
                        className="d-flex justify-content-between align-items-center"
                        onClick={() =>{
                            console.log(project.id)
                            setSelectedProjectId(project.id);
                            setAddingTaskToPhase(null);
                            setNewTaskName("");
                            }}

                    >   {editingProjectId === project.id ? (
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                        }
                                    onKeyDown={(e)=> {
                                        if(e.key === "Enter") {
                                            editProject(
                                                project.id,
                                                editName,
                                                project.completed
                                                );
                                            setEditingProjectId(null);
                                            }
                                        }}
                                    />
                                ) : (
                                <span>{project.name}</span>
                        )}
                    <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary py-0 px-2"
                                onClick={() => {
                                    setEditingProjectId(project.id);
                                    setEditName(project.name);
                                    }}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                         <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(project.id);
                                }}
                            >
                            <i className="bi bi-trash"></i>
                         </button>
                         </div>
                    </div>
                    </div>
                ))}

            </div>

            <div className="col p-3">

                {selectedProject && (
                    <div>
                        <h1>{selectedProject.name}</h1>
                        <button onClick={createPhase}>
                            Add Phase
                        </button>
                        {phases.filter(
                            phase => phase.project_id === selectedProjectId
                            ).map((phase) =>(
                            <div className="card mb-3"  key={phase.id}>
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                            >
                            {editingPhaseId === phase.id ? (
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                        }
                                    onKeyDown={(e)=> {
                                        if(e.key === "Enter") {
                                            editPhase(
                                                phase.id,
                                                editName,
                                                phase.completed
                                                );
                                            setEditingPhaseId(null);
                                            }
                                        }}
                                    />
                                ) : (
                                    <span>{phase.name}</span>
                                )
                            }
                            <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary py-0 px-2"
                                onClick={() => {
                                    setEditingPhaseId(phase.id);
                                    setEditName(phase.name);
                                    }}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePhase(phase.id);
                                }}
                            >
                                <i className="bi bi-trash"></i>
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                            {addingTaskToPhase === phase.id ? (
                                <input
                                    type="text"
                                    value={newTaskName}

                                    onChange={(e)=>
                                        setNewTaskName(e.target.value)
                                        }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            createTask(phase.id);
                                            }
                                        }}
                                />
                                ) : (
                                    <button onClick={() => setAddingTaskToPhase(phase.id)}>
                                        Add Task
                                    </button>

                            )}
                            {tasks.filter(
                                task => task.phase_id === phase.id
                                ).map((task) =>(
                                <div
                                    key={task.id}
                                    className="d-flex justify-content-between align-items-center border-bottom py-1"
                                >
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleTask(
                                            task
                                            )}
                                        checked={task.completed}

                                        />
                                        {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                        }
                                    onKeyDown={(e)=> {
                                        if(e.key === "Enter") {
                                            editTask(
                                                task.id,
                                                editName,
                                                task.completed
                                                );
                                            setEditingTaskId(null);
                                            }
                                        }}
                                    />
                                ) : (
                                    <span>{task.name}</span>
                                )
                            }
                                   </div>
                                   <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary py-0 px-2"
                                onClick={() => {
                                    setEditingTaskId(task.id);
                                    setEditName(task.name);
                                    }}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                                   <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(phase.id, task.id);
                                            }}
                                        >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    </div>
                                    </div>
                                ))}
                            </div>

                            </div>
                            ))}
                    </div>
                )}

            </div>

        </div>
        </div>
    );
}