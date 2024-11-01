import {  useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { getApi } from "../api";
import { TaskList } from '../Components/TaskList';
import { Todo } from '../Todo';

function TodoPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const api = getApi();

  useEffect(() => {
    api.TodoService.getTodo(+id).then((res) => res.json()).then((todo) => {
      setTodo(new Todo(todo));
    });
  }, [id]);

  return todo ? (
    <div>
      <h1>{todo.title}</h1>
      <TaskList tasks={todo.tasks} todoId={todo.id} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export { TodoPage };