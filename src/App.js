import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
  // Switch,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState, useReducer } from "react";
import { getApi } from "./api";
import { Todo } from "./Todo";
import { Title } from "./Title";

const api = getApi();

const InputBox = ({ initialValue, onSave, onCancel }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSave(value);
          setValue("");
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          onCancel();
          setValue("");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const Task = ({ task, onComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onEditComplete = (newTitle) => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };
  return isEditing ? (
    <InputBox
      initialValue={task.title}
      onSave={onEditComplete}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
        />
        {task.title}
      </label>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

function TaskList({ tasks, todoId }) {
  const [taskList, dispatch] = useReducer(taskReducer, tasks);
  const onComplete = (id) => {
    api.TodoLocal.setCompleted(todoId, id).then(({ id: markedId }) => {
      console.log(markedId);
      dispatch({ type: "toggle-complete", id: markedId });
    });
  };
  const onEdit = (id, newTitle) => {
    dispatch({ type: "edit", id, title: newTitle });
  };
  const onDelete = (id) => dispatch({ type: "delete", id });
  const onSave = (title) => dispatch({ type: "add", title });

  return (
    <div>
      {taskList.map((task) => (
        <Task
          task={task}
          onComplete={onComplete}
          key={task.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <InputBox onSave={onSave} onCancel={() => {}} initialValue={""} />
    </div>
  );
}

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
        },
      ];
    default:
      return state;
  }
};

function TodoPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    api.TodoLocal.getTodoList(+id).then((todo) => {
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

function TitlesPage() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    api.TodoLocal.getTitles().then((titles) => {
      setTitles(titles.map((title) => new Title(title)));
    });
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      {titles.map((todo) => {
        return (
          <Link to={`/todo/${todo.id}`}>
            <div key={todo.id}>{todo.title}</div>
          </Link>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <h1>Todo App</h1>
      <Routes>
        <Route path="/" element={<TitlesPage />} />
        <Route path="/todo/:id" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
