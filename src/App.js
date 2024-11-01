import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { TodoPage } from "./Pages/TodoPage";
import { TitlesPage } from "./Pages/TitlesPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Todo App</Link>
      <Routes>
        <Route path="/" element={<TitlesPage />} />
        <Route path="/todo/:id" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
