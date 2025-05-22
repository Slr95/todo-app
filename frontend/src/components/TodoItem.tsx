import React from "react";
import { Todo } from "../types/todo";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-200 ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(todo)}
          className={`w-6 h-6 transition-all duration-200 ${
            todo.completed
              ? "text-green-500 hover:text-green-600"
              : "text-gray-300 hover:text-indigo-500"
          }`}
        >
          <CheckCircleIcon className="w-6 h-6" />
        </button>
        <span
          className={`text-lg transition-all duration-200 ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-700 group-hover:text-indigo-600"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
