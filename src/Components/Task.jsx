import { useState } from "react";
import { InputBox } from "../Components/InputBox";

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

export { Task };