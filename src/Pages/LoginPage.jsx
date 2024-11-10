import { useEffect } from "react";
import { getApi } from "../api";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  const api = getApi();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const callLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        await api.TodoService.login(code)
          .then((res) => res.json())
          .then((data) => {
            login(data.token);
            navigate("/");
          });
      }
    };
    callLogin();
  }, []);

  return isAuthenticated() ? (
    navigate("/")
  ) : (
    <div>
      <h1>Login Page</h1>
      <a href={url}>Login With Github</a>
    </div>
  );
};

export { LoginPage };
