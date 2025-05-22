import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://localhost:8000/api";

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get(`${API_URL}/todos/`);
    return response.data;
  },

  async createTodo(title: string): Promise<Todo> {
    const response = await axios.post(`${API_URL}/todos/`, { title });
    return response.data;
  },

  async updateTodo(todo: Todo): Promise<Todo> {
    const response = await axios.put(`${API_URL}/todos/${todo.id}/`, todo);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_URL}/todos/${id}/`);
  },
};
