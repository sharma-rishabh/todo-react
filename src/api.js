const getApi = (url = '') => { 
 return {
  TodoService: {
    getTodo: async (id) => {
      return  await fetch(`${url}/api/todo/${id}`);
    },

    getAllTodos: async () => {
      const response = await fetch(`${url}/api/all-todos`);
      return await response.json();
    },
  },
};
}
export { getApi };