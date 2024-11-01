import { useReducer } from "react";
import { titlesReducer } from '../Reducers/titleReducer';
import { TitleComponent } from './Title';
import { InputBox } from './InputBox';
import { getApi } from '../api';


function TitlesList({ titles }) {
  const [titleList, dispatch] = useReducer(titlesReducer, titles);
  const api = getApi();
  const onSave = (title) => {
    api.TodoService.addTodo(title).then((response) => {
      return response.json();
    }).then((title) => {
      dispatch({ type: "add", title });
    });
  }


  const onEdit = (id, newTitle) => {
    api.TodoService.editTitle(id, newTitle).then((response) => {
      return response.json();
    }).then((todo) => {
      dispatch({ type: "edit", id: todo.id, title: todo.title });
    });
  }


  const onDelete = (id) => {
    api.TodoService.deleteTitle(id).then((res)=> res.json()).then((titles) => {
      dispatch({ type: "delete", titles });
    });
  };

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
