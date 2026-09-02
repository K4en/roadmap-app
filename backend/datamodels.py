from pydantic import BaseModel

class ProjectCreate(BaseModel):
    name: str

class ProjectUpdate(BaseModel):
    name: str
    completed: bool

class PhaseCreate(BaseModel):
    name: str
    project_id: int

class PhaseUpdate(BaseModel):
    name: str
    completed: bool

class TaskCreate(BaseModel):
    name: str
    phase_id: int

class TaskUpdate(BaseModel):
    name: str
    completed: bool
