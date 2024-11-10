import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { TodoPage } from "./Pages/TodoPage";
import { TitlesPage } from "./Pages/TitlesPage.jsx";
import { LoginPage } from "./Pages/LoginPage";
import { AuthProvider } from "./Contexts/AuthContext";
import { PrivateRoutes } from "./Routes/PrivateRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Link to="/">Todo App</Link>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<TitlesPage />} />
            <Route path="/todo/:id" element={<TodoPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
