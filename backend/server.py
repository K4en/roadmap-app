from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
import os
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Functions -----
def complete_task(project_id, phase_id, task_id):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for project in data["projects"]:
        if project["id"] == project_id:
            for phase in project["phases"]:
                if phase["id"] == phase_id:
                    for task in phase["tasks"]:
                        if task["id"] == task_id:
                            task["completed"] = True

    with open(f"data.json", "w") as f:
        json.dump(data, f)

def complete_phase(project_id, phase_id):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for project in data["projects"]:
        if project["id"] == project_id:
            for phase in project["phases"]:
                if phase["id"] == phase_id:
                    phase["completed"] = True
                    for task in phase["tasks"]:
                        if not task["completed"]:
                            phase["completed"] = False


    with open(f"data.json", "w") as f:
        json.dump(data, f)

def complete_project(project_id):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for project in data["projects"]:
        if project["id"] == project_id:
            project["completed"] = True
            for phase in project["phases"]:
                if not phase["completed"]:
                    project["completed"] = False

    with open(f"data.json", "w") as f:
        json.dump(data, f)

# ----- ENDPOINTS -----
@app.post("/projects")
def create_project(project: dict):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    new_project = {
        "id": len(data["projects"]) + 1,
        "name": project["name"],
        "completed": False,
        "phases": []
    }

    data["projects"].append(new_project)

    with open("data.json", "w") as f:
        json.dump(data, f, indent=2)

@app.get("/projects")
def get_projects():
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)
            return data["projects"]

@app.get("/projects/{project_id}")
def get_project(project_id: int):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for p in data["projects"]:
        if p["id"] == project_id:
            return p



@app.patch("/projects/{project_id}")
def update_project(project_id: int, new_data: dict):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for i in range(len(data["projects"])):
        project = data["projects"][i]
        if project["id"] == project_id:
            data["projects"][i] = new_data

    with open("data.json", "w") as f:
        json.dump(data, f, indent=2)

@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

    for i in range(len(data["projects"])):
        project = data["projects"][i]
        if project["id"] == project_id:
            data["projects"].pop(i)

    with open("data.json", "w") as f:
        json.dump(data, f, indent=2)

@app.post("/phases")
def create_phase(request: Request):
    if os.path.exists("data.json"):
        with open("data.json", "r") as f:
            data = json.load(f)

#@app.post("/tasks")
#def create_task(request: Request):

#@app.post("/side-branches")
#def create_side_branch(request: Request):