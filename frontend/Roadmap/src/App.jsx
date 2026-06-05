import { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProjectName, setNewProjectName] = useState("");
    const [addingTaskToPhase, setAddingTaskToPhase] = useState(null);
    const [newTaskName, setNewTaskName] = useState("");


    useEffect(() => {
            fetch("http://127.0.0.1:8000/projects")
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);

                    if(data.length > 0){
                        setSelectedProject(data[0]);
                        }
                    });

    }, []);



    function toggleTask(projectId, phaseId, taskId){
        projects.forEach((project) =>{
            if (project.id === projectId){
                project.phases.forEach((phase) => {
                    if (phase.id === phaseId){
                        phase.tasks.forEach((task) => {
                                if (task.id === taskId){
                                        task.completed = !task.completed;
                                    }
                            });
                    }});
            }});
        setProjects([...projects]);
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

            }).then(() => fetch("http://127.0.0.1:8000/projects"))
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                });

    }

    function createPhase(){
        const updateProject = {...selectedProject};

        updateProject.phases.push({
            id: updateProject.phases.length+1,
            name: "Phase " + (updateProject.phases.length + 1),
            completed: false,
            tasks:[]
            });

        fetch(`http://127.0.0.1:8000/projects/${selectedProject.id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(updateProject)
            })
                .then(() => {
                    return fetch("http://127.0.0.1:8000/projects");
                    })
                .then((response) => response.json())
                .then((data) => {setProjects(data);
                    });
                ;
        }




    function createTask(phaseId){
        const updateProject = {...selectedProject};

        updateProject.phases.forEach((phase) =>{
            if (phase.id === phaseId){
                phase.tasks.push({
                    id: phase.tasks.length + 1,
                    name: newTaskName,
                    completed: false
                    });
                }
            });
        fetch(`http://127.0.0.1:8000/projects/${selectedProject.id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(updateProject)
            }
        )
            .then(() => {
                    return fetch("http://127.0.0.1:8000/projects");
                    })
                .then((response) => response.json())
                .then((data) => {setProjects(data);
                    });
        ;
    }

    function deleteProject(projectId){


        fetch(`http://127.0.0.1:8000/projects/${selectedProject.id}`,{
            method: "DELETE"
            })
            .then(() => fetch("http://127.0.0.1:8000/projects"))
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setSelectedProject(null);
                });
        }

    function deletePhase(phaseId){
        const updateProject = {...selectedProject}

        updateProject.phases = updateProject.phases.filter(
            phase => phase.id !== phaseId
            );

        fetch(`http://127.0.0.1:8000/projects/${selectedProject.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(updateProject)
            })
                .then(() => fetch("http://127.0.0.1:8000/projects"))
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    const updateProject = data.find(
                        p => p.id === selectedProject.id
                        );
                    setSelectedProject(updateProject);
                });


        }


    function deleteTask(phaseId, taskId){
        const updateProject = {...selectedProject}

            updateProject.phases.forEach((phase) => {
                    if (phase.id === phaseId){
                        phase.tasks = phase.tasks.filter(
                            task => task.id !== taskId
                            );
                        }});

        fetch(`http://127.0.0.1:8000/projects/${selectedProject.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(updateProject)
            })
                .then(() => fetch("http://127.0.0.1:8000/projects"))
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    const updateProject = data.find(
                        p => p.id === selectedProject.id
                        );
                    setSelectedProject(updateProject);
                });

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
                    <div className="card p-2 mb-3">
                    <div
                        className="d-flex justify-content-between align-items-center"
                        key={project.id}
                        onClick={() =>{
                            setSelectedProject(project);
                            setAddingTaskToPhase(null);
                            setNewTaskName("");
                            }}

                    >
                        <span>{project.name}</span>

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
                ))}

            </div>

            <div className="col p-3">

                {selectedProject && (
                    <div>
                        <h1>{selectedProject.name}</h1>
                        <button onClick={createPhase}>
                            Add Phase
                        </button>
                        {selectedProject.phases.map((phase) =>(
                            <div className="card mb-3">
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                key={phase.id}
                            >
                            <span>{phase.name}</span>
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
                            {phase.tasks.map((task) =>(
                                <div
                                    key={task.id}
                                    className="d-flex justify-content-between align-items-center border-bottom py-1"
                                >
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleTask(
                                            selectedProject.id,
                                            phase.id,
                                            task.id
                                            )}
                                        checked={task.completed}

                                        />
                                        {task.name}
                                   </div>
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