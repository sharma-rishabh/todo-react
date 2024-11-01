const titlesReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.title];
    case "delete":
      return action.titles;
    case "edit":
      return state.map((title) =>
        title.id === action.id ? { ...title, title: action.title } : title
      );
    default:
      return state;
  }
};
export { titlesReducer };
