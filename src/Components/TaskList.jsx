import { useState, useReducer } from "react";
import { taskReducer } from "../Reducers/taskReducer";
import { InputBox } from "../Components/InputBox";
import { getApi } from "../api";
import { Task } from "../Components/Task";


function TaskList({ tasks, todoId }) {
  const [taskList, dispatch] = useReducer(taskReducer, tasks);
  const [dragId, setDragId] = useState(null);
  const api = getApi();

  const onComplete = (id) => {
    api.TodoService.toggleCompleted(todoId, id).then((res) => res.json()).then(({ id: markedId }) => {
      console.log(markedId);
      dispatch({ type: "toggle-complete", id: markedId });
    });
  };

  const onEdit = (id, newTitle) => {
    api.TodoService.editTaskTitle(todoId, id, newTitle).then((res) => res.json()).then((task) => {
      dispatch({ type: "edit", id, title: newTitle });
    });
  };

  const onDelete = (id) => {
    api.TodoService.deleteTask(todoId, id)
      .then((res) => res.json())
      .then((tasks) => {
        dispatch({ type: "delete", tasks })
      });
  };

  const onSave = (title) => {
    api.TodoService.addTask(todoId, title)
      .then((res) => res.json())
      .then((task) => {
        dispatch({ type: "add", task });
    });
  };
  const onDrag = (e) => {
    setDragId(+e.currentTarget.id);
  };
  const onDrop = (e) => {
    const dropId = +e.currentTarget.id;
    const newPriority = taskList.find((task) => task.id === dropId).priority;

    api.TodoService.updatePriority(todoId, dragId, newPriority).then((res) => res.json()).then((tasks) => {
        dispatch({ type: "priority-update", tasks });
     });
  };

  return (
    <div>
      {taskList
        .sort((a, b) => a.priority - b.priority)
        .filter((task) => !task.deleted)
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

export { TaskList };