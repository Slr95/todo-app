import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import { TodoItem } from "./components/TodoItem";
import { todoService } from "./services/todoService";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await todoService.createTodo(newTodo);
      setTodos([todo, ...todos]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updatedTodo = await todoService.updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Todo App
                </h1>
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Add a new todo..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                </form>
                <div className="space-y-4">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
