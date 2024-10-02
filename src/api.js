import { Todo } from "./Todo.js";

export const api = {
  TodoService: {
    getTodo: async (id) => {
      const response = await fetch(`/api/todo/${id}`);
      const data = await response.json();
      return new Todo(data);
    },

    getAllTodos: async () => {
      const response = await fetch("/api/all-todos");
      const todos = await response.json();
      return todos.map((todo) => new Todo(todo));
    },
  },
};
