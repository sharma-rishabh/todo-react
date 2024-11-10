const getApi = (url = "") => {
  const token = window.localStorage.getItem("token");
  return {
    TodoService: {
      login: async (code) => {
        return await fetch(`${url}/api/login?sessionCode=${code}`);
      },
      getTodo: async (id) => {
        return await fetch(`${url}/api/todo/${id}`, {
          headers: {
            ref: "todo",
            Authorization: token,
          },
        });
      },

      getAllTodos: async () => {
        const response = await fetch(`${url}/api/all-todos`, {
          headers: {
            ref: "todo",
            Authorization: token,
          },
        });
        return await response.json();
      },

      addTodo: async (title) => {
        return await fetch(`${url}/api/add-todo`, {
          method: "POST",
          body: JSON.stringify({ title }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      editTitle: async (id, title) => {
        return await fetch(`${url}/api/edit-title/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      deleteTitle: async (id) => {
        return await fetch(`${url}/api/delete-title/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      toggleCompleted: async (todoId, taskId) => {
        return await fetch(`${url}/api/toggle-completed/${todoId}/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      addTask: async (todoId, title) => {
        return await fetch(`${url}/api/add-task/${todoId}`, {
          method: "POST",
          body: JSON.stringify({ title }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      editTaskTitle: async (todoId, taskId, title) => {
        return await fetch(`${url}/api/edit-task-title/${todoId}/${taskId}`, {
          method: "PUT",
          body: JSON.stringify({ title }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      deleteTask: async (todoId, taskId) => {
        return await fetch(`${url}/api/delete-task/${todoId}/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      updatePriority: async (todoId, taskId, newPriority) => {
        return await fetch(
          `${url}/api/update-task-priority/${todoId}/${taskId}/${newPriority}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      },
    },
  };
};
export { getApi };
