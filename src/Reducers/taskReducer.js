const taskReducer = (state, action) => {
  switch (action.type) {
    case "toggle-complete":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case "edit":
      return state.map((task) =>
        task.id === action.id ? { ...task, title: action.title } : task
      );
    case "delete":
      return action.tasks;
    case "add":
      return [...state, action.task];
    case "priority-update":
      return action.tasks;
    default:
      return state;
  }
};

export { taskReducer };
