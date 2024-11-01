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

export { TaskList };