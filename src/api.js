const titles = [
  {
    id: 1,
    title: "Do the laundry",
    deleted: false,
  },
  {
    id: 2,
    title: "Go to supermarket",
    deleted: false,
  },
  {
    id: 3,
    title: "Go to Park",
    deleted: false,
  },
];

const todoLists = [
  {
    id: 1,
    title: "Do the laundry",
    tasks: [
      {
        id: 1,
        title: "Wash clothes",
        completed: false,
        deleted: false,
        priority: 1,
      },
      {
        id: 2,
        title: "Dry clothes",
        completed: false,
        deleted: false,
        priority: 2,
      },
      {
        id: 3,
        title: "Fold clothes",
        completed: false,
        deleted: false,
        priority: 3,
      },
      {
        id: 4,
        title: "Put away clothes",
        completed: false,
        deleted: false,
        priority: 4,
      },
    ],
  },
  {
    id: 2,
    title: "Go to supermarket",
    tasks: [
      {
        id: 1,
        title: "Buy milk",
        completed: false,
        deleted: false,
        priority: 1,
      },
      {
        id: 2,
        title: "Buy eggs",
        completed: false,
        deleted: false,
        priority: 2,
      },
      {
        id: 3,
        title: "Buy bread",
        completed: false,
        deleted: false,
        priority: 3,
      },
    ],
  },
  {
    id: 3,
    title: "Go to Park",
    tasks: [
      {
        id: 1,
        title: "Take a walk",
        completed: false,
        deleted: false,
        priority: 1,
      },
      {
        id: 2,
        title: "Play soccer",
        completed: false,
        deleted: false,
        priority: 2,
      },
      {
        id: 3,
        title: "Play basketball",
        completed: false,
        deleted: false,
        priority: 3,
      },
    ],
  },
];

const getApi = (url = "") => {
  return {
    TodoService: {
      getTodo: async (id) => {
        return await fetch(`${url}/api/todo/${id}`);
      },

      getAllTodos: async () => {
        const response = await fetch(`${url}/api/all-todos`);
        return await response.json();
      },

      addTodo: async (title) => {
        console.log(JSON.stringify({ title }));
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
    },
    TodoLocal: {
      getTitles: async () => {
        return titles;
      },
      getTodoList: async (id) => {
        return todoLists.find((todo) => todo.id === id);
      },
      setCompleted: async (todoId, taskId) => {
        const todo = todoLists.find((todo) => todo.id === todoId);
        todo.tasks = todo.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return todo.tasks.find((task) => task.id === taskId);
      },
    },
  };
};
export { getApi };
