# Todo Application

A full-stack todo application built with Django (backend) and React (frontend). This application allows users to manage their tasks with features like creating, updating, and deleting todos.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Modern and responsive user interface
- RESTful API backend
- Real-time updates

## Tech Stack

### Backend
- Django 5.0.2
- Django REST Framework
- SQLite (default database)
- Python 3.12

### Frontend
- React 18.2.0
- TypeScript
- Tailwind CSS
- Vite

## Prerequisites

- Python 3.12 or higher
- Node.js 18 or higher
- npm or yarn

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run database migrations:
```bash
python manage.py migrate
```

5. Start the Django development server:
```bash
python manage.py runserver
```

The backend server will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/todos/` - List all todos
- `POST /api/todos/` - Create a new todo
- `GET /api/todos/{id}/` - Retrieve a specific todo
- `PUT /api/todos/{id}/` - Update a todo
- `DELETE /api/todos/{id}/` - Delete a todo

## Project Structure

```
todo-app/
├── backend/             # Django backend
│   ├── todo/           # Main Django app
│   ├── manage.py
│   └── requirements.txt
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
