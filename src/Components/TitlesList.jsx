import { useReducer } from "react";
import { titlesReducer } from '../Reducers/titleReducer';
import { TitleComponent } from './Title';
import { InputBox } from './InputBox';


function TitlesList({ titles }) {
  const [titleList, dispatch] = useReducer(titlesReducer, titles);
  const onSave = (title) =>
    dispatch({ type: "add", title: { title, id: 999 } });
  const onEdit = (id, newTitle) =>
    dispatch({ type: "edit", id, title: newTitle });
  const onDelete = (id) => dispatch({ type: "delete", id });

  return (
    <div>
      {titleList.map((title) => {
        return (
          <TitleComponent
            title={title}
            key={title.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
      <InputBox onSave={onSave} onCancel={() => {}} initialValue={""} />
    </div>
  );
};

export { TitlesList };
