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

const Task = ({ task, onComplete, onEdit, onDelete, onDrag, onDrop }) => {
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
    <div
      draggable={true}
      onDragStart={onDrag}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      id={task.id}
    >
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
  const [dragId, setDragId] = useState(null);
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
  const onDrag = (e) => {
    setDragId(+e.currentTarget.id);
  };
  const onDrop = (e) => {
    const dropId = +e.currentTarget.id;
    const newPriority = taskList.find((task) => task.id === dropId).priority;
    dispatch({ type: "priority-update", id: +dragId, newPriority });
  };
  console.log(taskList);
  return (
    <div>
      {taskList
        .sort((a, b) => a.priority - b.priority)
        .map((task) => (
          <Task
            task={task}
            onComplete={onComplete}
            key={task.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onDrag={onDrag}
            onDrop={onDrop}
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
