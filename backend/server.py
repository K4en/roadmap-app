import uuid

from fastapi import FastAPI, Request, Response
import sqlite3

from starlette.middleware.cors import CORSMiddleware

from datamodels import (
ProjectCreate,
ProjectUpdate,
PhaseCreate,
PhaseUpdate,
TaskCreate,
TaskUpdate
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== BaseModels ====



# ==== ENDPOINTS ====

# ==== PROJECTS
@app.post("/projects")
def create_project(project: ProjectCreate):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()

    cursor.execute("INSERT INTO projects(name) VALUES (?)", (project.name,))
    conn.commit()
    conn.close()


@app.get("/projects")
def list_projects():
    conn = sqlite3.connect("roadmap.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM projects")
    projects = [
        dict(row)
        for row in cursor.fetchall()
    ]
    conn.close()
    return projects

@app.patch("/projects/{id}")
def update_task(project: ProjectUpdate, id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""
                    UPDATE projects SET name = ?, completed = ? WHERE id = ?""",
                   (project.name, project.completed, id,))
    conn.commit()
    conn.close()

@app.delete("/projects/{id}")
def delete_project(id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE id = ?", (id,))
    conn.commit()
    conn.close()

# ==== PHASES ====
@app.get("/phases")
def list_phases():
    conn = sqlite3.connect("roadmap.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM phases")
    phases = [
        dict(row)
        for row in cursor.fetchall()
    ]
    conn.close()
    return phases

@app.post("/phases")
def create_phase(phase: PhaseCreate):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""
                INSERT INTO phases(project_id, name, completed) 
                VALUES (?, ?, ?) """,
        (phase.project_id, phase.name, 0,))
    conn.commit()
    conn.close()

@app.patch("/phases/{id}")
def update_phase(phase: PhaseUpdate, id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""
                    UPDATE phases SET name = ?, completed = ? WHERE id = ?""",
                   (phase.name, phase.completed, id,))
    conn.commit()
    conn.close()

@app.delete("/phases/{id}")
def delete_phase(id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM phases WHERE id = ?", (id,))
    conn.commit()
    conn.close()

# ==== TASKS ====
@app.get("/tasks")
def list_tasks():
    conn = sqlite3.connect("roadmap.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tasks")
    tasks = [
        dict(row)
        for row in cursor.fetchall()
    ]
    conn.close()
    return tasks

@app.post("/tasks")
def create_task(task: TaskCreate):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO tasks(phase_id, name, completed)
                    VALUES (?, ?, ?)""",
                   (task.phase_id, task.name, 0,))
    conn.commit()
    conn.close()

@app.patch("/tasks/{id}")
def update_task(task: TaskUpdate, id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""
                    UPDATE tasks SET name = ?, completed = ? WHERE id = ?""",
                   (task.name, task.completed, id,))
    conn.commit()
    conn.close()

@app.delete("/tasks/{id}")
def delete_task(id: int):
    conn = sqlite3.connect("roadmap.db")
    cursor = conn.cursor()
    cursor.execute("""DELETE FROM tasks WHERE id = ?""",(id,))
    conn.commit()
    conn.close()