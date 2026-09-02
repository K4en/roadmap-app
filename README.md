# Roadmap App

A small full-stack project management / roadmap application built as a learning project.

The purpose of this project was to learn and practice building a complete application from the database layer up, rather than simply following a tutorial or assembling pre-written code.

## What it does

The application allows you to organise work into:

- Projects
- Phases
- Tasks

Each level can be created, edited, deleted and, where applicable, marked as completed.

The data is persisted in a SQLite database and accessed through a FastAPI REST API. The frontend is built with React.

## Tech Stack

- **Frontend:** React
- **Backend:** Python / FastAPI
- **Database:** SQLite
- **API communication:** REST / JSON
- **UI:** Bootstrap

## Why I built it

This project started as a learning exercise to understand how the different parts of a full-stack application fit together.

Rather than treating the backend and frontend as separate pieces, I used the project to work through the complete flow:

    User interaction
        ↓
    React state
        ↓
    fetch()
        ↓
    FastAPI endpoint
        ↓
    Pydantic validation
        ↓
    SQLite
        ↓
    Response
        ↓
    React state / UI

A major part of the project was working out the structure and behaviour of the application myself and debugging the problems that appeared along the way.

## What I learned

### Backend

- Designing a relational database structure
- Working with SQLite from Python
- Creating REST endpoints with FastAPI
- Using HTTP methods appropriately:
  - GET
  - POST
  - PATCH
  - DELETE
- Request validation with Pydantic
- Separating related entities into database tables
- Working with foreign keys and relationships
- Understanding how API design affects the frontend

### Frontend

- React components and JSX
- `useState`
- `useEffect`
- Conditional rendering
- Rendering lists with `.map()`
- Handling user input
- Managing selected objects/IDs
- Calling REST APIs with `fetch()`
- Updating the UI after backend changes

### Full-stack development

One of the main lessons from this project was understanding that the frontend and backend are not isolated.

Changing the database structure meant changing the API responses, which meant changing the React state and rendering logic.

For example, the application originally treated projects as nested objects containing their phases and tasks. The database was later redesigned so that projects, phases and tasks were separate entities connected through IDs.

That required reworking the frontend to retrieve and work with those separate resources.

## Development approach

This project was deliberately developed incrementally.

Instead of designing the entire application in advance, functionality was added and tested piece by piece:

1. Database structure
2. Backend endpoints
3. Frontend state
4. Data retrieval
5. Create operations
6. Delete operations
7. Completion handling
8. Editing
9. Refactoring the frontend around the new data structure

This resulted in plenty of small bugs along the way — including validation errors, incorrect state handling, mismatched function arguments and frontend/backend data mismatches.

Those problems were part of the learning process and helped me understand why each layer of the application works the way it does.

## Current status

**V1 — Complete**

The application currently provides the core roadmap functionality I originally intended to build.

Future possibilities include:

- User authentication
- Multiple users
- Project ownership
- Project versions/releases
- Deployment
- Additional UI polish

These are intentionally left outside the scope of V1.

## Learning outcome

This project is less about the complexity of the final application and more about the process of building it.

It was one of my first projects where I moved from assembling existing examples towards actually reasoning about:

- what data the application needs
- how that data should be structured
- what each endpoint should do
- what information the frontend needs
- how frontend state should represent the backend data
- how the different pieces communicate

The result is a deliberately simple application, but one that I understand from the database layer through to the user interface.
