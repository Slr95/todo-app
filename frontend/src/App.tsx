import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import { TodoItem } from "./components/TodoItem";
import { todoService } from "./services/todoService";
import { PlusIcon } from "@heroicons/react/24/outline";

type FilterType = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setIsLoading(false);
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
              <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
              <p className="text-indigo-100">
                Stay organized and boost your productivity
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white border-b">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.active}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
            </div>

            {/* Add Todo Form */}
            <div className="p-6 bg-white border-b">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Task
                </button>
              </form>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="flex gap-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === "active"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === "completed"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="p-6 bg-white">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
              ) : filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {filter === "all"
                    ? "No tasks yet. Add one above!"
                    : filter === "active"
                    ? "No active tasks"
                    : "No completed tasks"}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
