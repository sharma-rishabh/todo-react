import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InputBox } from './InputBox';


function TitleComponent({ title, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const onEditComplete = (newTitle) => {
    onEdit(title.id, newTitle);
    setIsEditing(false);
  };
  return isEditing ? (
    <InputBox
      initialValue={title.title}
      onSave={onEditComplete}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <div>
      <Link to={`/todo/${title.id}`} key={title.id}>
        <div key={title.id}>{title.title}</div>
      </Link>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => onDelete(title.id)}>Delete</button>
    </div>
  );
}

export { TitleComponent };
