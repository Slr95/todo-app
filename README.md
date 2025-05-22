# Todo App with React and Django

A full-stack todo application built with React frontend and Django backend.

## Setup

### Backend Setup

1. Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run migrations:

```bash
cd backend
python manage.py migrate
```

4. Start the Django server:

```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm start
```

## Features

- Create, Read, Update, and Delete todos
- Mark todos as complete/incomplete
- Clean and modern UI
- REST API backend
- Persistent storage with SQLite database

