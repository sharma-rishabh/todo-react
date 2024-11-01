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
      return state.filter((task) => task.id !== action.id);
    case "add":
      return [
        ...state,
        {
          id: state.length + 1,
          title: action.title,
          completed: false,
          deleted: false,
          priority: state.length + 1,
        },
      ];
    case "priority-update":
      const task = state.find((task) => task.id === action.id);
      if (task.priority === action.newPriority) return state;
      const originalPriority = task.priority;
      const isPriorityUpgraded = task.priority > action.newPriority;
      return state
        .sort((a, b) => a.priority - b.priority)
        .map((task) => {
          if (task.id === action.id) {
            task.priority = action.newPriority;
          } else if (
            isPriorityUpgraded &&
            task.priority >= action.newPriority &&
            task.priority < originalPriority
          ) {
            task.priority += 1;
          } else if (
            !isPriorityUpgraded &&
            task.priority <= action.newPriority &&
            task.priority > originalPriority
          ) {
            task.priority -= 1;
          }
          return task;
        });
    default:
      return state;
  }
};

export { taskReducer };