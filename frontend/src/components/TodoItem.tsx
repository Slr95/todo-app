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
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(todo)}
          className={`w-6 h-6 ${
            todo.completed
              ? "text-green-500 hover:text-green-600"
              : "text-gray-400 hover:text-gray-500"
          }`}
        >
          <CheckCircleIcon className="w-6 h-6" />
        </button>
        <span
          className={`text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-600"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
