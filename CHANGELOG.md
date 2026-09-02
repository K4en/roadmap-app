# Changelog

## [1.0.0] - 2026-09-02

### Added

- Project creation
- Project deletion
- Project editing
- Phase creation
- Phase deletion
- Phase editing
- Task creation
- Task deletion
- Task editing
- Task completion tracking
- SQLite persistence
- FastAPI REST API
- React frontend
- Pydantic request validation

### Changed

- Redesigned the database so projects, phases and tasks are stored as separate related entities.
- Reworked the frontend to work with the new database/API structure.
- Added separate frontend state for projects, phases and tasks.
- Added reusable data-loading logic for synchronising the frontend with the backend.
- Added editing functionality using PATCH requests.

### Development notes

The original implementation represented projects, phases and tasks as nested objects.

During development, the database was redesigned to use separate tables and relationships:

    Projects
       ↓
    Phases
       ↓
    Tasks

This required corresponding changes throughout the frontend.

The project was developed as a learning exercise, with the API endpoints, database operations, React state and frontend behaviour being reasoned through and implemented incrementally rather than copied from a complete application.

## [0.1.0]

### Added

- Initial project structure
- React frontend
- FastAPI backend
- SQLite database
- Initial project/phase/task functionality