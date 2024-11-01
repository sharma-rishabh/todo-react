import { useState, useEffect } from 'react';
import { getApi } from '../api';
import { Title } from '../Title';
import { TitlesList } from '../Components/TitlesList';

function TitlesPage() {
  const [titles, setTitles] = useState(null);
  const api = getApi();

  useEffect(() => {
    api.TodoService.getAllTodos().then((titles) => {
      setTitles(titles.map((title) => new Title(title)));
    });
  }, []);
  return titles ? (
    <div>
      <h1>Todo List</h1>
      <TitlesList titles={titles} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export { TitlesPage };